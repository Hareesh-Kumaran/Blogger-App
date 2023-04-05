import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userDetails: {},
    isLoggedIn: false,
  },
  reducers: {
    fetchuserDetails: (state, action) => {
     
    },
  },
});

export const { fetchuserDetails } = userSlice.actions;
export default userSlice.reducer;
