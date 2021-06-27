import { createSlice } from "@reduxjs/toolkit";
export const profileSlice = createSlice({
  name: "Profile data",
  initialState: {
    status: "idle",
  },
  reducers: {},
});
export default profileSlice.reducer;
