const express = require("express");
const { body } = require("express-validator");
const { userLogin } = require("../controllers/user.controller");

const router = express.Router();

router.post(
  "/login",
  body("email").isEmail(),
  body("password").isLength({ min: 3 }),
  userLogin
);

module.exports = router;
