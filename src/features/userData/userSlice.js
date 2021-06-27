import { createSlice } from "@reduxjs/toolkit";
export const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    status: "idle",
  },
});
export default userSlice.reducer;
