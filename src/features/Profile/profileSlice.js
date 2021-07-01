import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const getUserData = createAsyncThunk(
  "api/getUserData",
  async ({ userId }) => {
    const response = await axios.get(
      `https://fin-twitter-backend.herokuapp.com/api/users/${userId}`
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
  reducers: {
    resetStatus: (state) => {
      state.status = "idle";
    },
  },
  extraReducers: {
    [getUserData.pending]: (state) => {
      state.status = "loading";
    },
    [getUserData.rejected]: (state) => {
      state.status = "error";
      state.errMessage = "Error in Loading UserData";
    },
    [getUserData.fulfilled]: (state, action) => {
      state.status = "success";
      const {
        id,
        posts,
        likedPosts,
        followers,
        following,
        notifications,
        name,
        userName,
        email,
        website,
        bio,
        coverImage,
        userImage,
      } = action.payload.userData;
      state.status = "success";
      state.userId = id;
      state.posts = posts;
      state.likedPosts = likedPosts;
      state.notifications = notifications;
      state.followers = followers;
      state.following = following;
      state.name = name;
      state.userName = userName;
      state.email = email;
      state.website = website;
      state.bio = bio;
      state.coverImage = coverImage;
      state.userImage = userImage;
    },
  },
});
export const { resetStatus } = profileSlice.actions;
export default profileSlice.reducer;
