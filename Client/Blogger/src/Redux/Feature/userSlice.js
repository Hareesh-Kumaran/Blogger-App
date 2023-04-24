import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userDetails: {},
    isLoggedIn: false,
  },
  reducers: {
    fetchuserDetails: (state, action) => {
      console.log("@user reducer ,fetchuserDetails", action.payload);
    },

    fetchUserSuccesful: (state, action) => {
      if (!action.payload) {
        return;
      }
      console.log("@fetchUserSuccesful", action.payload);
      state.userDetails = action.payload;
      state.isLoggedIn = true;
    },
    
    resetUserState: (state) => {
      console.log("resetCalled");
      state.userDetails = {};
      state.isLoggedIn = false;
    },
  
  },
});

export const { fetchuserDetails, fetchUserSuccesful, resetUserState } =
  userSlice.actions;
export default userSlice.reducer;
