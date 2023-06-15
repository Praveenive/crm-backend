import mongoose from "mongoose";
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
    first_name:{
        type:String,
        required:true,
        maxlength:32
    },
    last_name:{
        type:String,
        required:true,maxlength:32
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    type_of_user:{
          type:String,
          required:true,
          enum: ["admin", "manager", "employee"]
    }
})

const generateJwtToken = (id)=>{
    return jwt.sign({id},process.env.SECERT_KEY)
}
const User = mongoose.model("user",userSchema);
export {User,generateJwtToken}