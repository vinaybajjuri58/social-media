import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import notificationReducer from "../features/notifications/notificationSlice";
import postSlice from "../features/posts/postSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    notifications: notificationReducer,
    posts: postSlice,
  },
});
