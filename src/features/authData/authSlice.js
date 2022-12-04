import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const getLoginDataWithExpiry = () => {
  const initialAuthData = {
    isLoggedIn: false,
    userToken: null,
    userId: "",
  };
  const authData = localStorage.getItem("login");
  if (!authData) {
    return initialAuthData;
  }
  const parsedAuthData = JSON.parse(authData);
  const now = new Date();
  if (!parsedAuthData.expiry || now.getTime() > parsedAuthData.expiry) {
    localStorage.removeItem("login");
    return initialAuthData;
  }
  return parsedAuthData;
};

const initialAuthData = getLoginDataWithExpiry();

export const loginAPICall = createAsyncThunk(
  "api/signup",
  async ({ email, password }) => {
    const response = await axios.post(
      "https://fin-twitter-backend.onrender.com/api/users/login",
      {
        email,
        password,
      }
    );
    return response.data;
  }
);

export const authSlice = createSlice({
  name: "authenticationSlice",
  initialState: {
    status: "idle",
    errorMessage: "",
    loginAPICall: false,
    userId: initialAuthData.userId,
    isLoggedIn: initialAuthData.isLoggedIn,
    userToken: initialAuthData.userToken,
  },
  reducers: {
    logoutButtonPressed: (state) => {
      state.state = "idle";
      state.isLoggedIn = false;
      state.userToken = null;
      state.userId = "";
      localStorage?.removeItem("login");
    },
  },
  extraReducers: {
    [loginAPICall.pending]: (state) => {
      state.status = "loading";
      state.errorMessage = "";
      state.loginAPICall = true;
    },
    [loginAPICall.fulfilled]: (state, action) => {
      localStorage.setItem(
        "login",
        JSON.stringify({
          isLoggedIn: true,
          userToken: action.payload.token,
          userId: action.payload.userId,
          expiry: new Date().getTime() + 64800000,
        })
      );
      state.isLoggedIn = true;
      state.loginAPICall = false;
      state.userToken = action.payload.token;
      state.userId = action.payload.userId;
    },
    [loginAPICall.rejected]: (state) => {
      state.status = "error";
      state.errorMessage = "Login Failed";
      state.loginAPICall = false;
    },
  },
});
export const { logoutButtonPressed } = authSlice.actions;
export default authSlice.reducer;
