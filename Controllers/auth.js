import jwt from "jsonwebtoken"
import { User } from "../Models/users.js";

const isAuthenticated = async(req,res,next)=>{
let token;
if(req.headers)
{
    try {
        token = req.headers["x-auth-token"];
        const decode = jwt.verify(token,process.env.SECERT_KEY)

        req.user  = await User.findById(decode.id).select("name email")
        next()
    } catch (error) {
        console.log(error)
        return res.status(400).json({data:"Invalid Authoration"})
    }
}
if(!token){
    return res.status(400).json({data:"Access Denied"})
}
}

export { isAuthenticated }