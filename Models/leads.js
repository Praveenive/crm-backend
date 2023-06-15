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
    Board:{
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
    }
})
const Leads = mongoose.model("leads",leadsSchema)
export {Leads}