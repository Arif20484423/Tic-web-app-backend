import { validationResult, matchedData } from "express-validator";
import MasterSheet from "../models/mastersheet.model.js";
export async function masterAddDetail(req, res) {
  const result = validationResult(req);
  if (result.isEmpty()) {
    const data = matchedData(req);
    try {
      const sheet = await MasterSheet.create(req.body);
      res.status(200).json({success:true,message:"added"})
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "some error occured", error: error });
    }
  } else {
    res
      .status(400)
      .json({
        success: false,
        message: "company and hr required not provided",
      });
  }
}
