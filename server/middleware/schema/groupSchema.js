import { body } from "express-validator";
import {groupExists} from  "../validator/groupValidator.js";

export const groupSchema = [
  body("group").exists({ checkFalsy: true }).escape().isAlphanumeric().custom(groupExists),
  body("firstName").ltrim().rtrim(),
  body("lastName").ltrim().rtrim(),
  body("email").trim().escape().isEmail().normalizeEmail().custom(emailInUse),
  body("password")
    .isStrongPassword(pwOptions)
    .withMessage(
      "Password must be at least 8 characters long, and contain one uppercase, one lowercase, and one number"
    )
    .custom(confirmPassword),
  body("picturePath").if(body("picturePath").exists()).isURL(),
];

