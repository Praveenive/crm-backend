import  express  from "express";
import { Leads } from "../Models/leads.js";

const router = express.Router()
 

router.get("/allleads", async(req,res)=>{
    try {
        const leads= await Leads.find({});
        console.log(leads)
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

 router.put("/edit/:id" , async(req,res)=>{
    try {
        const updatedLead = await Leads.findOneAndUpdate(
            {_id:req.params.id},
            {$set:req.body},
            {new:true});
        console.log(updatedLead)
        if(!updatedLead){
            return res.status(400).json({message:"Error Occured"})
        }
        res.status(200).json({data:updatedLead,message:"Succesfully updated"})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Server Error"})
    }
 })


 router.delete("/delete/:id" ,async(req,res)=>{
    try {
        const deleteLead = await Leads.findByIdAndDelete({_id:req.params.id})
        if(!deleteLead){
            res.status(400).json({message:"Error will not able to Delete"})
        }
        res.status(200).json({data:deleteLead,message:"successfully deleted"})
        
    } catch (error) {
        console.log(error)
       res.status(500).json({message:"Server error"})
    }
 })
 router.get("/myleads", async (req, res) => {
    try {
        const leads = await Leads
            .find({ assignedto: req.id })
            console.log(leads)
        if (!leads) {
            return res.status(400).json({ message: "Couldn't any Document" })
        }
        res.status(200).json({ message: "Sucessfully got your leads", data: leads })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" })
    }
})

 export const leadRouter = router