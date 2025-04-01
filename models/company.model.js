import mongoose from "mongoose";

const CompanySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: false
    },
    POC: {
        type: String,
        enum: [], // This should be populated with options from the branch table
        required: true
    },
    lastDrive: {
        type: Date,
        required: false
    }
});

export default mongoose.model("Company", CompanySchema);