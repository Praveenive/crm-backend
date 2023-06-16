import  express  from "express";
import { User } from "../Models/users.js";

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


export const employeerouter = router