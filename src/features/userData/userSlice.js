import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { removeFollower, newFollowerAdded } from "../Profile/profileSlice";

export const followUserAPI = createAsyncThunk(
  "api/followUser",
  async ({ userToken, userBId, userADetails }, { dispatch }) => {
    const response = await axios.post(
      "https://fin-twitter-backend.herokuapp.com/api/users/follow",
      {
        userBId,
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
    if (response.data.success === true) {
      dispatch(followButtonPressed({ data: response.data }));
      dispatch(newFollowerAdded({ userADetails }));
    }
    return response.data;
  }
);

export const unFollowUserAPI = createAsyncThunk(
  "api/unFollowUser",
  async ({ userToken, userBId, userId }, { dispatch }) => {
    const response = await axios.delete(
      "https://fin-twitter-backend.herokuapp.com/api/users/follow",
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
        data: {
          userBId: userBId,
        },
      }
    );
    if (response.data.success === true) {
      dispatch(unFollowButtonPressed({ userBId }));
      dispatch(removeFollower({ userId }));
    }
    return response.data;
  }
);

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
    apiCallStatus: "idle",
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
    unFollowButtonPressed: (state, action) => {
      const {
        payload: { userBId },
      } = action;
      state.following = state.following.filter(
        (follower) => follower.id !== userBId
      );
    },
    followButtonPressed: (state, action) => {
      const {
        payload: {
          data: { followerData },
        },
      } = action;
      state.following.push({
        _id: followerData.id,
        name: followerData.name,
        userName: followerData.userName,
        id: followerData.id,
        userImage: followerData.userImage,
      });
    },
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
    apiStatusReload: (state) => {
      state.apiCallStatus = "idle";
      state.errMessage = "";
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
    [followUserAPI.pending]: (state) => {
      state.apiCallStatus = "loading";
    },
    [followUserAPI.rejected]: (state) => {
      state.apiCallStatus = "error";
      state.errMessage = "request failed";
    },
    [followUserAPI.fulfilled]: (state, action) => {
      state.apiCallStatus = "success";
    },
    [unFollowUserAPI.pending]: (state) => {
      state.apiCallStatus = "loading";
    },
    [unFollowUserAPI.rejected]: (state) => {
      state.apiCallStatus = "error";
      state.errMessage = "request failed";
    },
    [unFollowUserAPI.fulfilled]: (state) => {
      state.apiCallStatus = "success";
    },
  },
});
export const {
  newPostAdded,
  reload,
  unFollowButtonPressed,
  followButtonPressed,
  profileDataUpdated,
} = userSlice.actions;
export default userSlice.reducer;
