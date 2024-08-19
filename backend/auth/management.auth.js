import jwt from "jsonwebtoken";
import { ManagementPerson } from "../models/managment.model.js";
import { errorHAndler } from "../utils/auth.error.js";
import bcrypt from 'bcrypt';

export const managementSignUp =async(req,res,next) => {
try {
    const { name, email, password,confirmPassword,mobile,role } = req.body;
    const existingemail =await ManagementPerson.findOne({  email });
    if (existingemail ) {
        return next( errorHAndler(400, "email already exist"   ))
    }  
    if(password!==confirmPassword){
        return next(errorHAndler(400, "Passwords do not match"))
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newManagement = new ManagementPerson(
        { 
            name,
            email, 
            password:hashedPassword,
            mobile,
            role,
        });
    await newManagement.save();

    const token = jwt.sign({_id:ManagementPerson.id},process.env.JWT_SECRET)
    res.cookie('token', token, {
        httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
        secure: process.env.NODE_ENV === 'production', // Set to true in production (requires HTTPS)
        sameSite: 'Lax', // Helps protect against CSRF attacks
      });
      console.log(token)




    res.status(201).json({ message: "Management person created successfully", management: newManagement });
    
} catch (error) {
    next(error);
}
}

export const managementLogin = async(req,res,next) => {
try {
    const {email,password} = req.body;
    const user = await ManagementPerson.findOne({email})
    if(!user){
        return next(errorHAndler(400, "User not found"))
    }
    const isMatch =await bcrypt.compare(password,user.password)
    if(!isMatch){
        return next(errorHAndler(400, "Invalid password"))
    }
    const token = jwt.sign({_id:user.id},process.env.JWT_SECRET)
    res.cookie('token', token, {
        httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
        secure: process.env.NODE_ENV === 'production', // Set to true in production (requires HTTPS)
        sameSite: 'Lax', // Helps protect against CSRF attacks
      });
    res.status(200).json({
        message: "Logged in successfully",
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    })
} catch (error) {
    next(error)
}

}






export const managementLogout = (req, res, next) => {
    try {
      res.clearCookie('token'); // Clears the 'token' cookie
      res.status(200).json({ message: "Logged out successfully" }); // Sends a success response
    } catch (error) {
      next(error); // Passes any errors to the error-handling middleware
    }
  }
  




export const getAllManagement = async(req,res,next) => {

    try {
        const allManagementUser = await ManagementPerson.find();
        res.json(allManagementUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    
}


export const updateManagement = async(req,res,next) => {
    try {
        const management = await ManagementPerson.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!management) {
            return next(400,"No management found with that ID")      }
        res.json(management);
    } catch (error) {
       next(error)
    }

}
export const deleteManagement = async(req,res,next) => {
    try {
        const management = await ManagementPerson.findByIdAndDelete(req.params.id);
        if (!management) {
            return next (400,"No management found with that ID" );
        }
        res.json({ message: "Management deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
 }

