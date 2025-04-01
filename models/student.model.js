import mongoose from "mongoose";

const RoleEnum = {
    STUDENT: "Student",
    TAP: "TAP",
    TIC: "TIC"
};

const studentSchema = mongoose.Schema({
    person: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Person",
        required: true
    },
    batch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Batch",
        required: true
    },
    role: {
        type: String,
        enum: Object.values(RoleEnum),
        required: true
    },
    rollNumber: {
        type: String,
        required: true,
        unique: true
    },
    collegeEmail: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^[a-zA-Z0-9._%+-]+@nitjsr\.ac\.in$/, "Please enter a valid college email address"]
    },
    password: {
        type: String,
        required: true,
        match: [/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/]
    },
    languages: {
        type: [String],
        default: []
    },
    resume: {
        type: String,
        default: null
    },
    domain: {
        type: [String],
        default: null
    },
    gapYear: {
        type: Number,
        default: false
    },
    tenth: {
        type: Number,
        required: true
    },
    twelfth: {
        type: Number,
        required: true
    },
    UG: {
        type: Number,
        default: null
    },
    PG: {
        type: Number,
        default: null
    }
});

export default mongoose.model("Student", studentSchema);