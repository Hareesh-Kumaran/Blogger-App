import {Router} from 'express';
import { createNewPost, deletePostByID, getAllPosts, getPostByID, updateBlogByID } from './blog.controller.js';

export const blogRouter=Router();

blogRouter.post("/", createNewPost);
blogRouter.get('/',getAllPosts);
blogRouter.get('/:id',getPostByID);
blogRouter.delete('/:id',deletePostByID);
blogRouter.put('/:id',updateBlogByID);//update by id 