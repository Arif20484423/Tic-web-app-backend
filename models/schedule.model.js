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
        ref: "Student",
        required: true
    },
    completedAt: {
        type: Date,
        default: null
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        required: false
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    },

});

export default mongoose.model("Schedule", schedule);