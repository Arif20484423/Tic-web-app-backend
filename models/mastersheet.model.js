import mongoose from "mongoose";

const mastersheetSchema = mongoose.Schema({
    company: {
        type: String,
        required: true
    },
    hrName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"]
    },
    altEmail: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"]
    },
    contactNumber: {
        type: String,
        required: true
    },
    altContactNumber: {
        type: String,
    },
    verifiedStatus: {
        type: Boolean,
        default: false
    },
    comments: {
        type: String,
    }
});

export default mongoose.model("Mastersheet", mastersheetSchema);