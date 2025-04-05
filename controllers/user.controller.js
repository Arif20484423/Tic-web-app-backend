import { validationResult, matchedData } from "express-validator";
import Person from "../models/person.model.js";
import Student from "../models/student.model.js";
import Batch from "../models/batch.model.js";
import { generateAccessToken } from "../utils/tokens.js";
import { getUser } from "../utils/tokens.js";
import { userBatchEntry, uploadMiddleware } from "../services/user.service.js";

export async function userLogin(req, res) {
  const result = validationResult(req);
  if (result.isEmpty()) {
    const data = matchedData(req);
    try {
      const student = await Student.findOne({ rollNumber: data.rollno });
      if (student) {
        if (student.comparePassword(data.password)) {
          const token = generateAccessToken({
            rollno: student.rollNumber,
            role: student.role,
          });
          return res
            .status(200)
            .cookie("token", token, { httpOnly: true, secure: true })
            .json("logged in");
        } else {
          return res.status(400).send({ messge: "Wrong Password" });
        }
      } else {
        return res.redirect("http://localhost:4000/api/v1/users");
      }
    } catch (error) {
      console.error("Error Occured at userLogin ", error);
      return res.status(400).json({ message: "Some Error Occured" });
    }
  } else {
    res.status(400).send({ messge: "Invalid details provided" });
  }
}

export async function userRegister(req, res) {
  const p = await Person.create({
    name: req.body.name,
    gender: req.body.gender,
  });
  const s = await Student.create({
    person: p._id,
    batch: "67eeee05a8d245275b702712",
    role: "Student",
    rollNumber: req.body.rollNumber,
    collegeEmail: req.body.email,
    password: req.body.password,

    tenth: 10,
    twelfth: 10,
    UG: 10,
    PG: 10,
  });
  res.send("added");
}

export async function userBatch(re, res) {
  await Batch.create({
    session: "2023-2024",
  });
  res.send("created");
}

export const batchEntry = [
  uploadMiddleware,  
  userBatchEntry,  
];
