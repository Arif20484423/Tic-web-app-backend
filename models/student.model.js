import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const RoleEnum = {
  STUDENT: "Student",
  TAP: "Tap",
  TIC: "Tic",
};

const studentSchema = mongoose.Schema({
  person: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Person",
    required: true,
  },
  batch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Batch",
    required: true,
  },
  role: {
    type: String,
    enum: Object.values(RoleEnum),
    required: true,
  },
  rollNumber: {
    type: String,
    required: true,
    unique: true,
  },
  collegeEmail: {
    type: String,
    unique: true,
    sparse: true,
    lowercase: true,
    trim: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@nitjsr\.ac\.in$/,
      "Please enter a valid college email address",
    ],
  },
  password: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
  },
  languages: {
    type: [String],
    default: [],
  },
  resume: {
    type: String,
    default: null,
  },
  domain: {
    type: [String],
    default: [],
  },
  gapYear: {
    type: Number,
    default: 0,
  },
  //marks all to be converted into cgpa
  tenth: {
    type: Number,
    required: true,
  },
  twelfth: {
    type: Number,
    required: true,
  },
  UG: {
    type: Number,
    default: null,
  },
  PG: {
    type: Number,
    default: null,
  },
});

studentSchema.pre("save", function (next) {
  if (this.isNew || this.isModified("password")) {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,}$/;

    if (!passwordRegex.test(this.password)) {
      const error = new mongoose.Error.ValidationError(this);
      error.addError(
        "password",
        new mongoose.Error.ValidatorError({
          message:
            "Password must contain at least 1 uppercase, 1 lowercase, 1 number, 1 special character and be at least 6 characters long.",
          path: "password",
          value: this.password,
        })
      );
      return next(error);
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(this.password, salt);
    this.password = hash;
  }
  next();
});

studentSchema.method("comparePassword", function (password) {
  return bcrypt.compareSync(password, this.password);
});

export default mongoose.model("Student", studentSchema);
