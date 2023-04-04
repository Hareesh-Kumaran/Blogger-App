import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userDetails: {},
    isLoggedIn: false,
  },
  reducers: {
    fetchuserDetails: (state, action) => {
      console.log("@user reducer ,fetchuserDetails");
    },
  },
});

export const { fetchuserDetails } = userSlice.actions;
export default userSlice.reducer;
