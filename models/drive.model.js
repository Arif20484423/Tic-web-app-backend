import mongoose from "mongoose";

const driveSchema = mongoose.Schema({
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    HR: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    }],
    dateOfDrive: {
        type: Date,
        required: true
    },
    batch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Batch',
        required: true
    },
    round: {
        type: String,
        required: true
    },
    offer: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: false
    },
    package: {
        type: Number,
        required: false
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    }],
    shortlisted: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    }],
    JD_JAF: {
        type: String,
        required: false
    }
});

export default mongoose.model("Drive", driveSchema);