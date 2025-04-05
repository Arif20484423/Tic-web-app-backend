import express from "express";
import { body } from "express-validator";
import {
  userLogin,
  userRegister,
  userBatch,
} from "../controllers/user.controller.js";
import { authenticateUser, refreshAccessToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post(
  "/login",
  body("rollNumber").exists().trim().notEmpty(),
  body("password").trim().isLength({ min: 6 }),
  userLogin
);
router.use(authenticateUser);
router.use(refreshAccessToken);
router.get("/", (req, res) => {
  // console.log(req);
  res.send("home");
});

router.get("/x", (req, res) => {
  res.redirect("http://localhost:4000/api/v1/users");
});
router.post("/register", userRegister);
router.post("/batch", userBatch);
export default router;
