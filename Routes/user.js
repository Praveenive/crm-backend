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
          return  res.status(400).json({message:"Email already exists"})
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password,salt)

        user =  await new User({
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            email:req.body.email,
            password:hashedPassword,
            type_of_user:"employee"
        }).save()
        const token = generateJwtToken(user._id);
        res.status(202).json({message:"Signup Done",token})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Server issues"})
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
        return res.status(404).json({message:"Password Mismatch"})
       }
       const token = generateJwtToken(user._id);
       res.status(202).json({data:"Loggedin successfully",token:token,role:user.type_of_user})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Internal server error"})
    }
})




export const userRouter = router;