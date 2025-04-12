import { body } from "express-validator";

export const setUserDetailsValidator = [
  body("personid").exists().trim().notEmpty(),
  body("studentid").exists().trim().notEmpty(),
  body("person").exists(),
  body("student").exists(),
];

export const userLoginValidator = [
  body("rollNumber").exists().trim().notEmpty(),
  body("password").trim().isLength({ min: 6 }),
];

export const userResetPasswordValidator = [
  body("token").exists().trim().notEmpty(),
  body("user").exists().trim().notEmpty(),
  body("password").exists().trim().notEmpty(),
];

export const userChangePasswordValidator = [
  body("password").exists().trim().notEmpty(),
  body("newPassword").exists().trim().notEmpty(),
];
