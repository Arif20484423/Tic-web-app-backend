import mongoose from "mongoose";

const studentPlacementStatusSchema = mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    status: {
        type: String,
        default: "Not Placed",
    },
    package: {
        type: Number,
        optional: true
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    role: {
        type: String,
        required: true
    },
    domain: {
        type: String,
        optional: true
    },
    onCampus: {
        type: Boolean,
        required: true
    }
});

export default mongoose.model("StudentPlacementStatus", studentPlacementStatusSchema);