import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userDetails: {},
    isLoggedIn: false,
  },
  reducers: {
    fetchuserDetails: (state, action) => {},

    fetchUserSuccesful: (state, action) => {
      if (!action.payload) {
        return;
      }

      state.userDetails = action.payload;
      state.isLoggedIn = true;
    },

    resetUserState: (state) => {
      state.userDetails = {};
      state.isLoggedIn = false;
    },
  },
});

export const { fetchuserDetails, fetchUserSuccesful, resetUserState } =
  userSlice.actions;
export default userSlice.reducer;
