import { Schema, model } from "mongoose";

const userSchema = Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  gender: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  location: { type: String, required: true },
  phone: { type: String, required: true },
  role: {type:String,default:"User"}
},{timestamps:true});

export const userModel = model("users", userSchema);
