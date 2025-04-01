import mongoose from "mongoose";

const branchSchema = mongoose.Schema({
    branchName: {
        type: String,
        required: true
    }
});

export default mongoose.model("Branch", branchSchema);