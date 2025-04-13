import {body} from "express-validator"


export const masterAddDetailValidator = [
    body("company").exists().trim().notEmpty(),
    body("hrName").exists().trim().notEmpty(),
]
export const masterEditDetailValidator = [
    body("company").optional().trim().notEmpty(),
    body("hrName").optional().trim().notEmpty(),
]