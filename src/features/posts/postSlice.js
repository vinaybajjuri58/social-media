import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { newPostAdded } from "../userData/userSlice";
import axios from "axios";

export const addComment = createAsyncThunk(
  "api/addComment",
  async ({ userToken, comment, postId }) => {
    const response = await axios({
      method: "POST",
      url: `https://fin-twitter-backend.herokuapp.com/api/comments/posts/${postId}`,
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
      data: {
        comment,
      },
    });
    return {
      comment: response.data.comment,
      userData: response.data.userId,
      postId,
    };
  }
);

export const likeComment = createAsyncThunk(
  "api/likeComment",
  async ({ userToken, commentId, postId, userId }) => {
    const response = await axios({
      method: "POST",
      url: `https://fin-twitter-backend.herokuapp.com/api/comments/${commentId}/likes`,
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return { data: response.data, userId, postId, commentId };
  }
);

export const dislikeComment = createAsyncThunk(
  "api/disLikeComment",
  async ({ userToken, postId, commentId, userId }) => {
    const response = await axios({
      method: "DELETE",
      url: `https://fin-twitter-backend.herokuapp.com/api/comments/${commentId}/likes`,
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return { data: response.data, commentId, postId, userId };
  }
);

export const getSinglePost = createAsyncThunk(
  "api/getSinglePost",
  async ({ postId }) => {
    const response = await axios.get(
      `https://fin-twitter-backend.herokuapp.com/api/posts/${postId}`
    );
    return response.data;
  }
);

export const likePost = createAsyncThunk(
  "api/likePost",
  async ({ userToken, postId, userId }) => {
    const response = await axios({
      method: "POST",
      url: `https://fin-twitter-backend.herokuapp.com/api/posts/${postId}/likes`,
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return { data: response.data, userId, postId };
  }
);

export const dislikePost = createAsyncThunk(
  "api/dislikePost",
  async ({ userToken, postId, userId }) => {
    const response = await axios.delete(
      `https://fin-twitter-backend.herokuapp.com/api/posts/${postId}/likes`,
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
    singlePost: null,
  },
  reducers: {
    apiCallStatusToInitialState: (state) => {
      state.apiCallStatus = "idle";
      state.apiCallErrorMessage = "";
    },
    resetSinglePost: (state) => {
      state.singlePost = null;
    },
  },
  extraReducers: {
    [likeComment.pending]: (state) => {
      state.apiCallStatus = "loading";
    },
    [likeComment.fulfilled]: (state, action) => {
      const {
        payload: { userId, postId, commentId },
      } = action;
      state.apiCallStatus = "success";
      if (state.singlePost !== null && postId === state.singlePost.id) {
        const commentIndex = state.singlePost.comments.findIndex(
          (comment) => comment.id === commentId
        );
        if (commentIndex !== -1) {
          state.singlePost.comments[commentIndex].likes.push(userId);
        }
      }
    },
    [dislikeComment.pending]: (state) => {
      state.apiCallStatus = "loading";
    },
    [dislikeComment.fulfilled]: (state, action) => {
      const {
        payload: { userId, postId, commentId },
      } = action;
      state.apiCallStatus = "success";
      if (state.singlePost !== null && postId === state.singlePost.id) {
        const commentIndex = state.singlePost.comments.findIndex(
          (comment) => comment.id === commentId
        );
        if (commentIndex !== -1) {
          state.singlePost.comments[commentIndex].likes =
            state.singlePost.comments[commentIndex].likes.filter(
              (user) => user !== userId
            );
        }
      }
    },
    [getSinglePost.pending]: (state) => {
      state.apiCallStatus = "loading";
    },
    [getSinglePost.fulfilled]: (state, action) => {
      state.apiCallStatus = "success";
      state.singlePost = action.payload.postData;
    },
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
      state.apiCallStatus = "success";
      const postIndex = state.posts.findIndex(
        (post) => post.postId === action.payload.postId
      );
      if (postIndex !== -1) {
        state.posts[postIndex].likes.push(action.payload.userId);
      }
      if (
        state.singlePost !== null &&
        state.singlePost._id === action.payload.postId
      ) {
        state.singlePost.likes.push(action.payload.userId);
      }
    },
    [dislikePost.pending]: (state) => {
      state.apiCallStatus = "loading";
    },
    [dislikePost.rejected]: (state) => {
      state.apiCallStatus = "error";
    },
    [dislikePost.fulfilled]: (state, action) => {
      state.apiCallStatus = "success";
      state.apiCallStatus = "success";
      const postIndex = state.posts.findIndex(
        (post) => post.postId === action.payload.postId
      );
      if (postIndex !== -1) {
        state.posts[postIndex].likes = state.posts[postIndex].likes.filter(
          (likedUser) => likedUser !== action.payload.userId
        );
      }
      if (
        state.singlePost !== null &&
        state.singlePost._id === action.payload.postId
      ) {
        state.singlePost.likes = state.singlePost.likes.filter(
          (user) => user !== action.payload.userId
        );
      }
    },
    [addComment.pending]: (state) => {
      state.apiCallStatus = "loading";
    },
    [addComment.fulfilled]: (state, action) => {
      const {
        payload: { comment, userData, postId },
      } = action;
      state.apiCallStatus = "success";
      if (state.singlePost !== null && state.singlePost.id === postId) {
        state.singlePost.comments.push({
          ...comment,
          userId: { ...userData, id: userData._id },
        });
      }
    },
  },
});
export const { apiCallStatusToInitialState, resetSinglePost } =
  postSlice.actions;
export default postSlice.reducer;
