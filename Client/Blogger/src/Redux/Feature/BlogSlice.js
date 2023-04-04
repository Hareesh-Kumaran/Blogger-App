import { createSlice } from '@reduxjs/toolkit' 

export const BlogSlice=createSlice({
    name:'blog',
    initialState:{
        listOfBlogs:[],
        isMediaSelected:false,
        location:"",//if nothing is selcted just show all blog 

    },
    reducers:{
        fetchBlog:(state,action)=>{

        },
        editBlog:(state,action)=>{

        },

    }
});

export const{fetchBlog,editBlog}=BlogSlice.actions;
export default BlogSlice.reducer;
