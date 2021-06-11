import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const getPosts = createAsyncThunk("getPostsData", async () => {});
export const postSlice = createSlice({
  name: "postSlice",
  initialState: {
    status: "idle",
    posts: [],
  },
  reducers: {},
});
export default postSlice.reducer;
