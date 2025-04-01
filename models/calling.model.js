import mongoose from "mongoose";

const callingSchema = mongoose.Schema({
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    lastDateCalled: {
        type: Date,
        required: true
    },
    caller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    callOrMail: {
        type: String,
        enum: ['Call', 'Mail'],
        required: true
    }
});

export default mongoose.model("Calling", callingSchema);