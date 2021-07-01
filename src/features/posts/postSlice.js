import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const getPosts = createAsyncThunk("api/getPostsData", async () => {
  const response = await axios.get(
    "https://fin-twitter-backend.herokuapp.com/api/posts"
  );
  return response.data;
});
export const postSlice = createSlice({
  name: "postSlice",
  initialState: {
    status: "idle",
    errorMessage: "",
    posts: [],
  },
  reducers: {},
  extraReducers: {
    [getPosts.pending]: (state) => {
      state.status = "loading";
    },
    [getPosts.rejected]: (state) => {
      state.status = "error";
      state.errorMessage = "Failed to load posts reload the page";
    },
    [getPosts.fulfilled]: (state, action) => {
      state.status = "success";
      state.posts = action.payload.posts;
    },
  },
});
export default postSlice.reducer;
