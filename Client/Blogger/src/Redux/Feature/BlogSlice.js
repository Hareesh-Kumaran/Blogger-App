import { createSlice } from "@reduxjs/toolkit";

export const BlogSlice = createSlice({
  name: "blog",
  initialState: {
    blogList: [],
    isMediaSelected: false,
    searchList: [],
    location: "none",
    searchValue: "",
  },
  reducers: {
    fetchBlog: (state, action) => {
      console.log("fetch blog called");
    },
    addToBlogList: (state, action) => {
      console.log("add to blogList", action.payload);
      state.blogList = [...action.payload];
    },
    setLocation: (state, action) => {
      console.log("@setlocation action", action.payload);
      state.location = action.payload;
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    setSearchList: (state, action) => {
      state.searchList = action.payload;
    },
    toggleMediaOption: (state, action) => {},
  },
});

export const {
  fetchBlog,
  setLocation,
  addToBlogList,
  setSearchValue,
  setSearchList,
  updateBlog
} = BlogSlice.actions;
export default BlogSlice.reducer;
