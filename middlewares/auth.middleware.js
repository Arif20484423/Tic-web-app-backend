// import jwt from "jsonwebtoken"

import { getUser } from "../utils/tokens.js";

export async function authenticateUser(req, res, next) {
  if (req.cookies.token) {
    const user = getUser(req.cookies.token)
    console.log(user)
    next();
  } 
  else{
    res.redirect("/")
    // res.send("sooryy")
  }

  
}
