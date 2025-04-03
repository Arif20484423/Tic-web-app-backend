import {validationResult} from "express-validator"
import jwt from "jsonwebtoken"


export function userLogin(req,res){
    const result = validationResult(req);
    if(result.isEmpty()){
        res.status(200).send("Hey yup")
        
    }
    else{
        res.status(400).send({messge:"Invalid details provided"})
    }
}


