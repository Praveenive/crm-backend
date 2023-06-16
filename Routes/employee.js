import  express  from "express";
import { User } from "../Models/users.js";
import bcrypt from 'bcrypt'

const router = express.Router()

router.get("/allemployee" ,async(req,res)=>{
    try {
        let employee = await User.find({type_of_user:"employee"});
        if(!employee){
            return res.status(400).json({message:"Employee not found"})
        }
            res.status(202).json({data:employee})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Server Error"})
    }
})


router.get("/allmanager" ,async(req,res)=>{
    try {
        let employee = await User.find({type_of_user:"manager"});
        if(!employee){
            return res.status(400).json({message:"Manager not found"})
        }
            res.status(202).json({data:employee})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Server Error"})
    }
})

router.post("/addemployee", async(req,res)=>{
    try {
        let user = await User.findOne({email:req.body.email})
        if(user){
            return res.status(400).json({message:"Email already Exists"})
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        user = await new User({
            firstname : req.body.firstname,
            lastname:req.body.lastname,
            email : req.body.email,
            password: hashedPassword,
            type_of_user:"employee"
        }).save();
        res.status(202).json({data:user,message:"Employee added successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Server Error"})
    }
})

export const employeerouter = router