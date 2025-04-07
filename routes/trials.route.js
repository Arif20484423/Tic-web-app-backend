import express from "express";
import flash from "connect-flash";
import session from "express-session";
const router = express.Router();

import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
router.use(
  session({
    secret: "kwhbdbih",
    resave: false,
    saveUninitialized: true,
  })
);
router.use(flash());

console.log(__dirname);
router.get("/", (req, res) => {
    req.flash("error","SOME error coowondc")
  res.redirect("http://localhost:4000/api/v1/trials/index")
});
router.get("/index", (req, res) => {
    res.render("index")
  });
  
export default router;
