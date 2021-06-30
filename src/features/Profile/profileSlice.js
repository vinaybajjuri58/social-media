import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const getUserData = createAsyncThunk(
  "api/getUserData",
  async ({ token }) => {
    const response = await axios.get(
      "https://fin-twitter-backend.herokuapp.com/api/users/",
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);
export const profileSlice = createSlice({
  name: "Profile data",
  initialState: {
    status: "idle",
    errMessage: "",
    posts: [],
    followers: [],
    following: [],
    notifications: [],
    name: "",
    email: "",
    website: "",
    bio: "",
    userName: "",
  },
  reducers: {},
  extraReducers: {
    [getUserData.pending]: (state) => {
      console.log("loading");
      state.status = "loading";
    },
    [getUserData.rejected]: (state) => {
      console.log("Error in loading data");
      state.status = "error";
      state.errMessage = "Error in Loading UserData";
    },
    [getUserData.fulfilled]: (state, action) => {
      console.log(action);
      state.status = "success";
    },
  },
});
export default profileSlice.reducer;
