import express from "express";
import { body } from "express-validator";
import masterRouter from "./master.router.js";
import { mail } from "../utils/Mail.js";
import {
  setUserDetailsValidator,
  userChangePasswordValidator,
  userLoginValidator,
  userResetPasswordValidator,
} from "../validators/user.validator.js";
import {
  authenticateUser,
  checkPermission,
  refreshAccessToken,
} from "../middlewares/auth.middleware.js";
import {
  userLogin,
  userRegister,
  userBatch,
  getUserDetails,
  setUserDetails,
  userSendMail,
  userResetPassword,
  uploadMiddleware,
  userBatchEntry,
  userChangePassword,
  userRole,
  userGetStudents,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/login", userLoginValidator, userLogin);

//permission remaining
router.post("/batchentry", uploadMiddleware, userBatchEntry);

router.post(
  "/mail",
  body("rollNumber").exists().trim().notEmpty(),
  userSendMail
);

//when forgot password logged out
router.post("/reset-password", userResetPasswordValidator, userResetPassword);

router.use(authenticateUser);
router.use(refreshAccessToken);
router.get("/", (req, res) => {
  // console.log(req);
  return res
    .status(200)
    .json({
      success: true,
      data: { name: req.name, rollNumber: req.rollNumber, role: req.role },
    });
});

router.get("/details", checkPermission("getUserDetails"), getUserDetails);
router.post(
  "/details",
  checkPermission("setUserDetails"),
  setUserDetailsValidator,
  setUserDetails
);

router.get("/role", checkPermission("userRole"), userRole);
router.post(
  "/change-password",
  userChangePasswordValidator,
  userChangePassword
);

router.get("/students", checkPermission("userGetStudents"), userGetStudents);

// remaining checkpermission
router.post("/register", userRegister);
router.post("/batch", userBatch);

// routes
router.use("/mastersheet", masterRouter);
export default router;
