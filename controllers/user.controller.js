import { validationResult, matchedData } from "express-validator";
import Person from "../models/person.model.js";
import Student from "../models/student.model.js";
import Batch from "../models/batch.model.js";
import bcrypt from "bcryptjs";
import ForgotToken from "../models/forgot-token.model.js";
import crypto from "crypto";
import multer from "multer";
import csvParser from "csv-parser";
import fs from "fs";

import { generateAccessToken, generateRefreshToken } from "../utils/tokens.js";
import { mail } from "../utils/Mail.js";

export function mapToken(user) {
  return generateAccessToken({
    id: user._id,
    rollNumber: user.rollNumber,
    role: user.role,
  });
}

export async function userLogin(req, res) {
  const result = validationResult(req);
  if (result.isEmpty()) {
    const data = matchedData(req);
    try {
      const student = await Student.findOne({ rollNumber: data.rollNumber });
      if (student) {
        if (student.comparePassword(data.password)) {
          const token = mapToken(student);
          const refreshToken = generateRefreshToken({
            id: student._id,
          });
          await Student.findByIdAndUpdate(student._id, {
            refreshToken: refreshToken,
          });
          const options = {
            httpOnly: true,
            secure: false
          };
          return res
            .status(200)
            .cookie("token", token, options)
            .cookie("refreshToken", refreshToken, options)
            .json({ success: true, message: "logged in", token: "Not Needed" });
        } else {
          return res
            .status(400)
            .json({ success: false, message: "Wrong Password" });
        }
      } else {
        return res
          .status(400)
          .json({ success: false, message: "User does not exists" });
      }
    } catch (error) {
      console.log(error);

      return res
        .status(500)
        .json({ success: false, message: "Some Error Occured", error: error });
    }
  } else {
    return res
      .status(400)
      .json({ success: false, message: "Invalid details provided" });
  }
}

export async function userRegister(req, res) {
  try {
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
  } catch (error) {
    console.log("error");
    return res.status(400).json({ success: false, error: error });
  }
}

export async function userBatch(re, res) {
  await Batch.create({
    session: "2023-2024",
  });
  res.send("created");
}

const upload = multer({ dest: "uploads/" });

export const uploadMiddleware = upload.single("file");

export const userBatchEntry = async (req, res) => {
  try {
    const batchDetails = req.body;
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
            gender: row.gender || "Male",
            email: row.email,
            contact: row.contact,
          });

          const student = await Student.create({
            person: person._id,
            batch: batch._id,
            role: "Student",
            rollNumber: row.rollNumber,
            collegeEmail: row.rollNumber + "@nitjsr.ac.in",
            password: "Pass@123",
            languages: [],
            resume: null,
            domain: [],
            gapYear: row.gapYear || 0,
            tenth: row.tenth || 0,
            twelfth: row.twelfth || 0,
            UG: row.UG || 0,
            PG: row.PG || 0,
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

export async function getUserDetails(req, res, next) {
  try {
    const user = await Student.findById(req.id, "-password -refreshToken")
      .populate("person")
      .populate("batch");
    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "some error occurred", error: error });
  }
}
export async function setUserDetails(req, res) {
  const result = validationResult(req);
  if (result.isEmpty()) {
    const data = matchedData(req);
    if (data.studentid == req.id) {
      const person = data.person;
      const student = data.student;
      try {
        await Person.findByIdAndUpdate({ _id: data.personid }, person, {
          runValidators: true,
        });
        await Student.findByIdAndUpdate({ _id: data.studentid }, student, {
          runValidators: true,
        });
        return res
          .status(200)
          .json({ success: true, message: "details updated successflly" });
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: "Some error occured updating information",
          error: error,
        });
      }
    } else {
      return res.status(401).json({
        success: false,
        message: "Unauthorized Access to Change User Information",
      });
    }
  } else {
    return res
      .status(400)
      .json({ success: false, messsage: "Invalid details provided" });
  }
}

export async function userSendMail(req, res) {
  const result = validationResult(req);
  if (result.isEmpty()) {
    const data = matchedData(req);
    const user = await Student.findOne({ rollNumber: data.rollNumber });
    if (user) {
      try {
        // return res.send(data.rollNumber)
        const tokenExists = await ForgotToken.findOne({
          rollNumber: data.rollNumber,
        });
        if (tokenExists) {
          await ForgotToken.deleteOne({ rollNumber: data.rollNumber });
        }
        const token = crypto.randomBytes(20).toString("hex");
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(token, salt);
        await ForgotToken.create({
          rollNumber: data.rollNumber,
          token: hash,
        });
        const link =
          process.env.RESET_URL +
          "?user=" +
          data.rollNumber +
          "&token=" +
          token;
        const content = `<div><p>We received a request to reset your password. Click the link below to choose a new password</p><a href=${link}>click here</a></div>`;
        const linkMail = await mail(
          "Reset Password Link",
          content,
          user.collegeEmail
        );

        if (linkMail.success) {
          return res.status(200).json({
            success: true,
            message: "Reset Link send to email " + user.collegeEmail,
          });
        } else {
          return res
            .status(500)
            .json({ success: false, message: "error sending mail" });
        }
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: "Some error occurred sending mail",
          error: error,
        });
      }
    } else {
      return res
        .status(400)
        .json({ success: false, message: "user does not exists" });
    }
  } else {
    return res.status(400).json({ success: false, message: "Invalid details" });
  }
}

export async function userResetPassword(req, res) {
  const result = validationResult(req);
  if (result.isEmpty()) {
    const data = matchedData(req);
    try {
      const user = await Student.findOne({ rollNumber: data.user });
      if (user) {
        const forgotToken = await ForgotToken.findOne({
          rollNumber: data.user,
        });
        if (forgotToken) {
          const now = Date.now();
          const created = new Date(forgotToken.createdAt).getTime();
          if (now - created <= 60 * 60 * 1000) {
            if (bcrypt.compareSync(data.token, forgotToken.token)) {
              user.password = data.password;
              await user.save();
              await ForgotToken.deleteOne({ rollNumber: data.user });
              return res.status(200).json({
                success: true,
                message: "password updated successfully",
              });
            } else {
              return res
                .status(400)
                .json({ success: false, message: "Link Expired" });
            }
          } else {
            return res
              .status(400)
              .json({ success: false, message: "Link Expired" });
          }
        } else {
          return res
            .status(400)
            .json({ success: false, message: "Link Expired" });
        }
      } else {
        return res
          .status(400)
          .json({ success: false, message: "Invalid user" });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "some error occurred", error: error });
    }
  } else {
    return res.status(400).json({ success: false, message: "invalid link" });
  }
}

export async function userRole(req, res) {
  res.status(200).json({ success: true, role: req.role });
}
export async function userChangePassword(req, res) {
  const result = validationResult(req);
  if (result.isEmpty()) {
    try {
      const data = matchedData(req);
      const student = await Student.findById(req.id);

      if (student.comparePassword(data.password)) {
        student.password = data.newPassword;
        await student.save();
        return res
          .status(200)
          .json({ success: true, message: "password Changed" });
      } else {
        return res
          .status(400)
          .json({ success: false, message: "Wrong current password" });
      }
    } catch (error) {
      console.log("error");
      return res.status(400).json({
        success: false,
        message: "invalid new password",
        error: error,
      });
    }
  } else {
    return res
      .status(400)
      .json({ success: false, message: "Invalid details provided" });
  }
}

export async function userGetStudents(req, res) {
  const data = await Student.aggregate([
    {
      $match: { rollNumber: "2023PGCSCA043" },
    },
    {
      $lookup: {
        from: "people",
        localField: "person",
        foreignField: "_id",
        as: "xyz",
      },
    },
  ]);
  res.send(data);
}
