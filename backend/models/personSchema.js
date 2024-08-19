import mongoose from "mongoose";
import bcrypt from "bcrypt";

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
  
    mobile: {
        type: String,
        required: true,
    },
  
    cnic: {
        type: String,
        required: true
    },
    rollNumber: {
        type: String,
        required: true
    },
    pashaFees: {
        type: String,
        enum:["unpaid", "paid"],
        default: "unpaid"
    },
    candidateType: {
        type: String,
        enum:["learner", "intern","employee"],
        default: "intern"
    },
    feeValue:{
        type: String,
        default: "0"
    }

});

personSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(this.password, salt);
        this.password = hashPassword;
        next();
    } catch (error) {
        console.error(error);
        next(error); // Pass the error to the next middleware
    }
});
personSchema.methods.comparePassword = async function (userPassword) {
    try {
        const match = await bcrypt.compare(userPassword, this.password);
        return match;
    } catch (error) {
        throw error;
    }
}

export const Person = mongoose.model('Person', personSchema);
