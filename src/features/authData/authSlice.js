import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialAuthData = JSON.parse(localStorage.getItem("login")) || {
  isLoggedIn: false,
  userToken: null,
};

export const loginAPICall = createAsyncThunk(
  "api/signup",
  async ({ email, password }) => {
    const response = await axios.post(
      "https://fin-twitter-backend.herokuapp.com/api/users/login",
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
    isLoggedIn: initialAuthData.isLoggedIn,
    userToken: initialAuthData.userToken,
  },
  reducers: {},
  extraReducers: {
    [loginAPICall.pending]: (state) => {
      state.status = "loading";
      state.errorMessage = "";
    },
    [loginAPICall.fulfilled]: (state, action) => {
      localStorage.setItem(
        "login",
        JSON.stringify({ isLoggedIn: true, userToken: action.payload.token })
      );
      state.isLoggedIn = true;
      state.userToken = action.payload.token;
    },
    [loginAPICall.rejected]: (state, action) => {
      state.status = "error";
      state.errorMessage = "Login Failed";
    },
  },
});
export default authSlice.reducer;
