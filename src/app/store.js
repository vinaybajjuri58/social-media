import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "../features/notifications/notificationSlice";
import postSlice from "../features/posts/postSlice";
import authSlice from "../features/authData/authSlice";
import userSlice from "../features/userData/userSlice";
import profileSlice from "../features/Profile/profileSlice";

export const store = configureStore({
  reducer: {
    notifications: notificationReducer,
    postsData: postSlice,
    authData: authSlice,
    userData: userSlice,
    profileData: profileSlice,
  },
});
