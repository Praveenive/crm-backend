import { ObjectId } from "mongodb"
import mongoose from "mongoose"

const leadsSchema = new mongoose.Schema({
   leadname: {
    type:String,
    maxlength:32,
    required:true
    },
    contactno:{
        type:Number,
        maxlength:10,
        required:true
    },
    standard:{
        type:Number,
        maxlength:2,
        required:true
    },
    schoolname:{
       type:String,
       required:true
    },
    board:{
      type:String,
      required:true
    },
    location:{
        type:String,
        requied:true
    },
    date:{
        type:String,
        required:true
    },
    parentname:{
        type:String,
    },
    request:{
        type:String,
        required:true
    },
    assignedto:{
        type:ObjectId,
        ref:"user"
    },
    leadstatus:{
        type:String
    }
})
const Leads = mongoose.model("leads",leadsSchema)
export {Leads}