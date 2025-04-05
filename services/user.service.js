import multer from "multer";
import csvParser from "csv-parser";
import fs from "fs";
import Person from "../models/person.model.js";
import Student from "../models/student.model.js";
import Batch from "../models/batch.model.js";

const upload = multer({ dest: "uploads/" });

export const uploadMiddleware = upload.single("file");

export const userBatchEntry = async (req, res) => {
  try {
    const batchDetails = req.body.batchId;  
    if (!batchDetails) {
      return res.status(401).json({ message: "Invalid Batch details" });
    }
    const batch = await Batch.create({
      session: batchDetails.session,
        totalStudents: batchDetails.totalStudents,
    });

    const students = [];
    const filePath = req.file.path;

    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on("data", async (row) => {
        try {
          const person = await Person.create({
            name: row.name,
            gender: row.gender,
            email: row.email,
            contact: row.contact,
          });

          const student = await Student.create({
            person: person._id,
            batch: batch._Id,
            role: "Student",
            rollNumber: row.rollNumber,
            collegeEmail: row.rollNumber+"@nitjsr.ac.in",
            password: row.rollNumber,
            languages: [],
            resume:   null,
            domain: [],
            gapYear: row.gapYear || 0,
            tenth: row.tenth || null,
            twelfth: row.twelfth || null,
            UG: row.UG || null,
            PG: row.PG || null,
          });

          students.push(student);
        } catch (error) {
          console.error("Error processing row:", row, error);
        }
      })
      .on("end", () => {
        fs.unlinkSync(filePath);
        res.status(200).json({
          message: "Batch entry completed",
          studentsCreated: students.length,
        });
      });
  } catch (error) {
    console.error("Error in batch entry:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};