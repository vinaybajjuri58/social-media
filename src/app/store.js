import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "../features/notifications/notificationSlice";
import postSlice from "../features/posts/postSlice";
import authSlice from "../features/authData/authSlice";
import userSlice from "../features/userData/userSlice";

export const store = configureStore({
  reducer: {
    notifications: notificationReducer,
    posts: postSlice,
    authData: authSlice,
    userData: userSlice,
  },
});
