const express = require("express")
const {userLogin}  = require("../controllers/user.controller")

const router = express.Router();

router.get("/login",userLogin)

module.exports = router
