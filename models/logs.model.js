import mongoose from "mongoose";

const logsSchema = mongoose.Schema({
    hr: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    callMailFlag: {
        type: String,
        enum: ["call", "mail"],
        required: true
    },
    contactedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    remark: {
        type: String,
        required: true
    }
});

export default mongoose.model("Logs", logsSchema);