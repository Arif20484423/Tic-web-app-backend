import express from "express"
import { masterAddDetailValidator, masterEditDetailValidator } from "../validators/master.validator.js";
import { masterAddDetail, masterEditDetail, masterGetDetail } from "../controllers/master.controller.js";
import { checkPermission } from "../middlewares/auth.middleware.js";
const router = express.Router();


router.get("/", checkPermission("masterGetDetail"), masterGetDetail)

router.post("/", checkPermission("masterAddDetail"), masterAddDetailValidator, masterAddDetail);

router.post("/:id", checkPermission("masterEditDetail"), masterEditDetailValidator, masterEditDetail);
export default router