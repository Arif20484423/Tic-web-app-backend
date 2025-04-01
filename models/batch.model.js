import mongoose from "mongoose";

const batchSchema = mongoose.Schema({
    session: {
        type: String,
        required: true
    },
    totalStudents: {
        type: Number,
        optional: true
    }
});

export default mongoose.model("Batch", batchSchema);