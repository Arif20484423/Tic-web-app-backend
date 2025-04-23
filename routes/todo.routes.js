import { Router } from "express";

const router = Router();
import {createSchedule,getTodaySchedule,getAllmySchedule,getAllCompletedSchedule, completeSchedule,getAllScheduleSortByDate,deleteAllCompletedSchedule} from "../controllers/todo.controller.js";
import { authenticateUser, checkPermission,refreshAccessToken } from "../middlewares/auth.middleware.js";

router.use(authenticateUser);
router.use(refreshAccessToken);
router.post("/create",  checkPermission("accessTodo"), createSchedule);
router.get("/today", checkPermission("accessTodo"), getTodaySchedule);
router.get("/my", checkPermission("accessTodo"), getAllmySchedule);
router.get("/completed", checkPermission("accessTodo"), getAllCompletedSchedule);
router.put("/update", checkPermission("accessTodo"), completeSchedule);
router.get("/", checkPermission("accessTodo"), getAllScheduleSortByDate);
router.delete("/delete", checkPermission("accessTodo"), deleteAllCompletedSchedule);
export default router;