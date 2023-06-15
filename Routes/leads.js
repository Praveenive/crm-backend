import  express  from "express";
import { Leads } from "../Models/leads.js";

const router = express.Router()
 

router.get("/allleads", async(req,res)=>{
    try {
        const leads= await Leads.find();
        if(!leads){
            res.status(404).json({message:"Leads not found"})
        }
        res.status(202).json({data:leads,message:"Leads Got it"})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Server Error"})
    }
})


 router.post("/add", async(req,res)=>{
    try {
        let leadGeneratedDate = new Date().toJSON().slice(0,10);
        const newLead = await new Leads({
            ...req.body,date:leadGeneratedDate
        }).save()
        if(!newLead){
           return  res.status(404).json({message:"Error while adding a lead"})
        }
      res.status(202).json({message:"Lead Added succesfully", data:newLead})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Server Error"})
    }
 })


 export const leadRouter = router