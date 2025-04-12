import {body} from "express-validator"


export const masterAddDetailValidator = [
    body("company").exists().trim().notEmpty(),
    body("hrName").exists().trim().notEmpty(),
]