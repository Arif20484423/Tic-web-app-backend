import express from "express";
import { body } from "express-validator";
import {
  userLogin,
  userRegister,
  userBatch,
  getUserDetails,
  setUserDetails,
  userSendMail,
  userResetPassword,
} from "../controllers/user.controller.js";
import {
  authenticateUser,
  checkPermission,
  refreshAccessToken,
} from "../middlewares/auth.middleware.js";
import { mail } from "../utils/Mail.js";

const router = express.Router();

router.post(
  "/login",
  body("rollNumber").exists().trim().notEmpty(),
  body("password").trim().isLength({ min: 6 }),
  userLogin
);

router.get("/mail", (req, res) => {
  mail("subject", "content", "arif7862016a@gmail.com");
  res.send("sending");
});

router.post(
  "/mail",
  body("rollNumber").exists().trim().notEmpty(),
  userSendMail
);

router.post(
  "/reset-password",
  body("token").exists().trim().notEmpty(),
  body("user").exists().trim().notEmpty(),
  body("password").exists().trim().notEmpty(),
  userResetPassword
);

router.use(authenticateUser);
router.use(refreshAccessToken);
router.get("/", (req, res) => {
  // console.log(req);
  res.send("home");
});

router.get("/details", checkPermission("getUserDetails"), getUserDetails);
router.post(
  "/details",
  checkPermission("setUserDetails"),
  body("personid").exists().trim().notEmpty(),
  body("studentid").exists().trim().notEmpty(),
  body("person").exists(),
  body("student").exists(),
  setUserDetails
);
router.get("/x", (req, res) => {
  res.redirect("http://localhost:4000/api/v1/users");
});

router.post("/register", userRegister);
router.post("/batch", userBatch);
export default router;
