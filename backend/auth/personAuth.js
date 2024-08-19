import { Person } from "../models/personSchema.js";
import { genrateToken } from '../middleware/jwtMiddleware.js'

export const addPerson =  async (req, res) => {
    try {
        const data = req.body;
        const person = new Person(data);
        const result = await person.save();
        // const payload ={
        //     id : result.id,
        //     username : result.username,
        // }
        
        // const token = genrateToken(payload);
        // console.log(`token :${token}`)

        res.status(201).json({ message: "Person added successfully", person: result 
            // ,token: token
         });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
export const login = async(req, res) => {
 try {
    const { username, password } = req.body;
    const user = await Person.findOne({ username });
    if (!user ||!(await user.comparePassword(password))) {
        return res.status(401).json({ error: "Invalid username or password" });
    }
    const payload ={
        id : user.id,
        username : user.username,
    }
    const token = genrateToken(payload);
    console.log(`token :${token}`)
    res.json({token: token})
    
 } catch (error) {
    res.status(400).json({ error: error.message });
    
 }
}

export const personAllData = async (req, res) => {
    try {
        const persons = await Person.find();
        res.status(200).json({ message: "Persons fetched successfully", persons: persons });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};
export const singlePerson =async (req, res) => {
    try {
        const userId = req.params.id;
        const person = await Person.findById(userId);
        if (!person) {
            return res.status(404).json({ error: "Person not found" });
        }
        res.status(200).json({ message: "Person fetched successfully", person: person });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}
export const personUpdate =  async (req, res) => {
    try {
        const userId = req.params.id;
        const newData = req.body;
        const updatedPerson = await Person.findByIdAndUpdate(userId, newData, { new: true , runValidators: true });
        if (!updatedPerson) {
            return res.status(404).json({ error: "Person not found" });
        }
        res.status(200).json({ message: "Person updated successfully", person: updatedPerson });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};
export const delPerson = async (req, res) => {
    try {
        const userId = req.params.id;
        const deletedPerson = await Person.findByIdAndDelete(userId);
        if (!deletedPerson) {
            return res.status(404).json({ error: "Person not found" });
        }
        res.status(200).json({ message: "Person deleted successfully", person: deletedPerson });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};
export const personType= async(req, res) =>{
    try {
        const worktype = req.params.worktype
    if(worktype == "maneger" || worktype == "client" || worktype == "onwer"){
        const response =await Person.find({ work : worktype})
        res.status(200 ).json(response);
    }
        
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
    };