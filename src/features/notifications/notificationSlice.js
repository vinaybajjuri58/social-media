import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const getNotifications = createAsyncThunk(
  "getNotifications",
  async () => {}
);

export const notificationSlice = createSlice({
  name: "notifications",
  initialState: {
    status: "idle",
    notifications: [],
  },
  reducers: {},
});

export default notificationSlice.reducer;
