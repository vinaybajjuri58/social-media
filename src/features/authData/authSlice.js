import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialAuthData = JSON.parse(localStorage.getItem("login")) || {
  isLoggedIn: false,
  userToken: null,
};

export const authSlice = createSlice({
  name: "authenticationSlice",
  initialState: initialAuthData,
  reducers: {},
});
export default authSlice.reducer;
