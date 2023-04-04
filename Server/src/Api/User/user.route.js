import {Router} from 'express';
import { createUserProfile, deleteUserById, getAllUserProfile, getUserProfileByID, updateUserProfileByID } from "./user.controller.js";
export const userRouter=Router();

userRouter.get('/',getAllUserProfile);//retrieves all the user profile
userRouter.get("/:id",getUserProfileByID);//get user by particular ID.
userRouter.post("/", createUserProfile);//create a new user profile.
userRouter.put("/:id",updateUserProfileByID)/*Update a particular field of a user*/
userRouter.delete("/:id",deleteUserById);//delete the profile by id

