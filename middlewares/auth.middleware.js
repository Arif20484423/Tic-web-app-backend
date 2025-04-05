// import jwt from "jsonwebtoken"

import { generateAccessToken, getUser } from "../utils/tokens.js";
import Student from "../models/student.model.js"
import { mapToken } from "../controllers/user.controller.js";
export function authenticateUser(req, res, next) {
  // console.log(req);
  console.log("Auth")
  if (req.cookies.token) {
    const response = getUser(req.cookies.token);
    if (response.success) {
      const user = response.user;
      req.id= user.id
      req.rollNumber = user.rollNumber;
      req.role = user.role;
  
  } 
}
  next();
}


export async function refreshAccessToken(req,res,next){
    console.log(req.id);
    if(req.id){
      console.log("passed");
      next();
    }
    else{
      console.log("notpassed");
      try {
        if(req.cookies.refreshToken){
            const response1 = getUser(req.cookies.refreshToken);
            if(response1.success){
                const user = response1.user;
                const student = await Student.findById(user.id);
                if(student.refreshToken==req.cookies.refreshToken){
                  const newToken = mapToken(student);
                  const options = { httpOnly: true, secure: true };
                  res.cookie("token", newToken, options);
                  next();
                  
                }
                else{
                  console.log("ref no comp")
                  res.redirect("/login")        
                }
            }
            else{
              console.log("ref exp")
              res.redirect("/login")    
            }
        }
        else{
          console.log(" no refresh")
            res.redirect("/login")
        }  
      } catch (error) {
        console.log("tryerror")
      }
      
    }
}