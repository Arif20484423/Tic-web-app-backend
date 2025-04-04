import mongoose from "mongoose";
const GenderEnum = {
  MALE: "Male",
  FEMALE: "Female",
  OTHER: "Other",
};

const person = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
  },
  gender: {
    type: String,
    enum: Object.values(GenderEnum),
    required: true,
  },
  email: {
    type: String,
    unique: true,
    sparse:true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
  },
  altEmail: {
    type: String,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
  },
  contact: {
    type: String,
  },
  altContact: {
    type: String,
  },
});

export default mongoose.model("Person", person);
