import express from "express"
import {body } from "express-validator"
import {userLogin } from "../controllers/user.controller.js"


const router = express.Router();

router.post(
  "/login",
  body("email").isEmail(),
  body("password").isLength({ min: 3 }),
  userLogin
);

export default router;
