import { validationResult, matchedData } from "express-validator";
import MasterSheet from "../models/mastersheet.model.js";
import mongoose from "mongoose";
export async function masterAddDetail(req, res) {
  const result = validationResult(req);
  if (result.isEmpty()) {
    const data = matchedData(req);
    try {
      const sheet = await MasterSheet.create(req.body);
      return res.status(200).json({ success: true, message: "added" });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "some error occured", error: error });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "company and hr required not provided",
    });
  }
}

export async function masterGetDetail(req, res) {
  try {
    const masterDetail = await MasterSheet.find({});
    return res.status(200).json({ success: true, data: masterDetail });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Some Error occured" });
  }
}

export async function masterEditDetail(req, res) {
  const id = req.params.id;
  const result = validationResult(req);
  if (result.isEmpty()) {
    if (mongoose.Types.ObjectId.isValid(id)) {
      const info = await MasterSheet.findById(id);
      if (info) {
        try {
          await MasterSheet.findByIdAndUpdate(id, req.body);
          return res.status(200).json({ success: true, message: "updated successfully" });
        } catch (error) {
          return res.status(400).json({
            success: false,
            message: "some error occured",
            error:error
          });
        }
      } else {
        return res.status(400).json({
          success: false,
          message: "wrong id- detail does not exists",
        });
      }
      // return res.status(200).json({ success: true, message: id });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "wrong id- detail does not exists" });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "company and hrName should not be empty",
    });
  }
}
