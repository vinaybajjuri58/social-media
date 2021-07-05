import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const getUserDataAPI = createAsyncThunk(
  "api/getUserData",
  async ({ userToken }) => {
    const response = await axios.get(
      "https://fin-twitter-backend.herokuapp.com/api/users/",
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
    return response.data;
  }
);
export const userSlice = createSlice({
  name: "User data",
  initialState: {
    status: "idle",
    errMessage: "",
    userId: "",
    posts: [],
    followers: [],
    following: [],
    notifications: [],
    name: "",
    email: "",
    website: "",
    bio: "",
    userName: "",
    userImage: "",
    coverImage: "",
  },
  reducers: {
    newPostAdded: (state, action) => {
      state.posts.unshift(action.payload);
    },
    reload: (state) => {
      state.status = "idle";
    },
    profileDataUpdated: (state, action) => {
      state.website = action.payload.websiteUrl;
      state.bio = action.payload.bio;
      state.userImage = action.payload.profileImage;
      state.coverImage = action.payload.coverImage;
    },
  },
  extraReducers: {
    [getUserDataAPI.pending]: (state) => {
      state.status = "loading";
    },
    [getUserDataAPI.rejected]: (state) => {
      state.status = "error";
      state.errMessage = "Error in Loading UserData";
    },
    [getUserDataAPI.fulfilled]: (state, action) => {
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
export const { newPostAdded, reload, profileDataUpdated } = userSlice.actions;
export default userSlice.reducer;
