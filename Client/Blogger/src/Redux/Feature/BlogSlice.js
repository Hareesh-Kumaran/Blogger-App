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
    fetchBlog: (state, action) => {},
    addToBlogList: (state, action) => {
      state.blogList = [...action.payload];
    },
    setLocation: (state, action) => {
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
  updateBlog,
} = BlogSlice.actions;
export default BlogSlice.reducer;
