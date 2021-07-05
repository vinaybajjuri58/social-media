import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { newPostAdded } from "../userData/userSlice";
import axios from "axios";

export const likePost = createAsyncThunk(
  "api/likePost",
  async ({ userToken, postId, userId }) => {
    const response = await axios.post(
      `https://fin-twitter-backend.herokuapp.com/api/posts/${postId}`,
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
    return { data: response.data, userId, postId };
  }
);
export const dislikePost = createAsyncThunk(
  "api/dislikePost",
  async ({ userToken, postId, userId }) => {
    const response = await axios.delete(
      `https://fin-twitter-backend.herokuapp.com/api/posts/${postId}`,
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
    return { data: response.data, userId, postId };
  }
);

export const addPost = createAsyncThunk(
  "appi/addPost",
  async (
    { userToken, userId, userImage, userName, name, message },
    { dispatch }
  ) => {
    const response = await axios.post(
      "https://fin-twitter-backend.herokuapp.com/api/posts/",
      {
        message,
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
    if (response.data.success === true) {
      dispatch(
        newPostAdded({
          userId,
          userImage,
          name,
          userName,
          postId: response.data.savedPost._id,
          message: response.data.savedPost.message,
          likes: [],
          comments: [],
        })
      );
    }
    return { data: response.data, userId, userImage, name, userName };
  }
);

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
    apiCallStatus: "idle",
    apiCallErrorMessage: "request failed",
    posts: [],
  },
  reducers: {
    apiCallStatusToInitialState: (state) => {
      state.apiCallStatus = "idle";
      state.apiCallErrorMessage = "";
    },
  },
  extraReducers: {
    [getPosts.pending]: (state) => {
      state.status = "loading";
    },
    [getPosts.rejected]: (state) => {
      state.errorMessage = "Failed to load posts reload the page";
      state.status = "error";
    },
    [getPosts.fulfilled]: (state, action) => {
      state.status = "success";
      state.posts = action.payload.posts;
    },
    [addPost.pending]: (state) => {
      state.apiCallStatus = "loading";
    },
    [addPost.fulfilled]: (state, action) => {
      state.apiCallStatus = "success";
      const { userId, userImage, name, userName, data } = action.payload;
      state.posts.unshift({
        userId,
        userImage,
        name,
        userName,
        postId: data.savedPost._id,
        message: data.savedPost.message,
        likes: [],
        comments: [],
      });
    },
    [addPost.rejected]: (state) => {
      state.errorMessage = "Error in adding post";
      state.apiCallStatus = "error";
    },
    [likePost.pending]: (state) => {
      state.apiCallStatus = "loading";
    },
    [likePost.rejected]: (state) => {
      state.apiCallStatus = "error";
    },
    [likePost.fulfilled]: (state, action) => {
      state.posts = state.posts.map((post) => {
        if (post.postId === action.payload.postId) {
          return {
            ...post,
            likes: post.likes.push(action.payload.userId),
          };
        } else return post;
      });
    },
    [dislikePost.pending]: (state) => {
      state.apiCallStatus = "loading";
    },
    [dislikePost.rejected]: (state) => {
      state.apiCallStatus = "error";
    },
    [dislikePost.fulfilled]: (state, action) => {
      state.posts = state.posts.map((post) => {
        if (post.postId === action.payload.postId) {
          return {
            ...post,
            likes: post.likes.pull(action.payload.userId),
          };
        } else return post;
      });
    },
  },
});
export const { apiCallStatusToInitialState } = postSlice.actions;
export default postSlice.reducer;
