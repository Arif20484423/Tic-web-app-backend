import mongoose from "mongoose";

const schedule = mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    subjectDescription: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        required: true
    },

});

export default mongoose.model("Schedule", batchSchema);