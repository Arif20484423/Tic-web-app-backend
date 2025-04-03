const { validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');


function userLogin(req,res){
    const result = validationResult(req);
    if(result.isEmpty()){
        res.status(200).send("Hey yup")
        
    }
    else{
        res.status(400).send({messge:"Invalid details provided"})
    }
}

module.exports = { userLogin }
