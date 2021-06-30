import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const getUserDataAPI = createAsyncThunk("api/getUserData", async () => {
  console.log("API triggered");
  const response = await axios.get(
    "https://fin-twitter-backend.herokuapp.com/api/users/"
  );
  return response.data;
});
export const userSlice = createSlice({
  name: "User data",
  initialState: {
    status: "idle",
    errMessage: "",
    posts: [],
    followers: [],
    following: [],
    notifications: [],
    name: "",
    email: "",
    website: "",
    bio: "",
    userName: "",
  },
  reducers: {},
  extraReducers: {
    [getUserDataAPI.pending]: (state) => {
      console.log("loading");
      state.status = "loading";
    },
    [getUserDataAPI.rejected]: (state) => {
      console.log("Error in loading data");
      state.status = "error";
      state.errMessage = "Error in Loading UserData";
    },
    [getUserDataAPI.fulfilled]: (state, action) => {
      console.log(action);
      state.status = "success";
    },
  },
});
export default userSlice.reducer;

// ,
//       {
//         headers: {
//           authorization: `Bearer ${token}`,
//         },
//       }
