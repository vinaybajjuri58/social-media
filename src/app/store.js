import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "../features/notifications/notificationSlice";
import postSlice from "../features/posts/postSlice";
import authSlice from "../features/authData/authSlice";

export const store = configureStore({
  reducer: {
    notifications: notificationReducer,
    posts: postSlice,
    authData: authSlice,
  },
});
