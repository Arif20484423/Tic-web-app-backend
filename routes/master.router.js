import express from "express"
const router = express.Router();


router.get("/",(req,res)=>{
    res.send("working")
})

// router.post("/")
export default router