import mongoose from "mongoose";
import bcrypt from "bcrypt";

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
      
    },
    email: {
        type: String,
        required: true,
    
    },
  password:{
    type: String,
    required: true,
  
  },
    mobile: {
        type: String,
        required: true,
    },
  
  
    role: {
        type: String,
        enum:["admin", "manager"],
        default: "manager"
    },
 

});


export const ManagementPerson = mongoose.model('ManagementPerson', adminSchema);
