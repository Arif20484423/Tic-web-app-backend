import mongoose from "mongoose";

const RoleEnum = {
    HR: "HR",
    ALUMNI: "Alumni",
    EMPLOYEE: "Employee"
};

const employeeSchema = mongoose.Schema({
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        required: true
    },
    person: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Person",
        required: true
    },
    role: {
        type: String,
        enum: Object.values(RoleEnum),
        required: true
    }
});

export default mongoose.model("Employee", employeeSchema);