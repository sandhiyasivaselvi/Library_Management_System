import mongoose, { Schema } from "mongoose";


  const memberSchema = new mongoose.Schema({
    name:{
        type:String,
        required : [true, "Member Name is required"]
    },
    email:{
        type:String,
        required : [true, "Email Address is required"]
    },
    phone:{
        type:Number,
        required : [true, "Phone Number is required"]
    },
    department:{
        type:String,
        required : [true, "Department is required"]
    },
    type: {
        type:String,
        required : [true, "Member Type is required"]

    }

  })
  
  export default mongoose.model("Member", memberSchema);