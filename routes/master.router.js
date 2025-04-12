import express from "express"
import { masterAddDetailValidator } from "../validators/master.validator.js";
import { masterAddDetail } from "../controllers/master.controller.js";
const router = express.Router();


router.get("/",(req,res)=>{
    res.send("working")
})

router.post("/",masterAddDetailValidator,masterAddDetail);
export default router