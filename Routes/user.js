import express from "express"
import { generateJwtToken, User } from "../Models/users.js";
import bcrypt from "bcrypt"


const router = express.Router();

router.post("/signup", async(req,res)=>
{
    try {
        let user = await User.findOne({email:req.body.email});
        console.log(user)
        if(user)
        {
          return  res.status(400).json({data:"Email already exists"})
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password,salt)

        user =  await new User({
            first_name:req.body.first_name,
            last_name:req.body.last_name,
            email:req.body.email,
            password:hashedPassword,
            type_of_user:req.body.type_of_user
        }).save()
        const token = generateJwtToken(user._id);
        res.status(202).json({message:"Signup Done",token})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({data:"Server issues"})
    }
}
)

router.post("/login", async(req,res)=>{
    try {
        let user = await User.findOne({email:req.body.email})
        console.log(user)
        if(!user  )
        {
           return res.status(400).json({message:"Invalid Data"})
        }
       const validatePassword = await bcrypt.compare(
        req.body.password,user.password
       )
       if(!validatePassword)
       {
        return res.status(404).json({data:"Password Mismatch"})
       }
       const token = generateJwtToken(user._id);
       res.status(202).json({data:"Loggedin successfully",token:token,role:req.body.type_of_user})
    } catch (error) {
        console.log(error)
        res.status(500).json({data:"Internal server error"})
    }
})




export const userRouter = router;