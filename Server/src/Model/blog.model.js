import { Schema,model } from "mongoose";

const blogSchema=Schema({
    title:{ type: String, required: true },
    category:{type:String,required:true},
    description:{type:String,default:"Description not found"},
    location:{type:String,default:"India"},
    date:{type:Schema.Types.Date,required:true,default:Date.now},
    media:{type:String,required:false},
    owner:{type:Schema.Types.ObjectId,required:true}
},{timestamps:true});

export const blogModel=model("blogs",blogSchema);

