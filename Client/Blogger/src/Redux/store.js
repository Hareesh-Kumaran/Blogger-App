import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Feature/userSlice";
import blogReducer from "./Feature/BlogSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    blog: blogReducer,
  },
});

export default store
