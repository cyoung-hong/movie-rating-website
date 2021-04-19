import { body } from "express-validator";
import { emailInUse, confirmPassword } from "../validator/authValidator.js";

const pwOptions = {
  minLength: 8,
  minLowercase: 1,
  minUppercase: 1,
  minNumbers: 1,
  minSymbols: 0,
  returnScore: false,
  pointsPerUnique: 1,
  pointsPerRepeat: 0.5,
  pointsForContainingLower: 10,
  pointsForContainingUpper: 10,
  pointsForContainingNumber: 10,
  pointsForContainingSymbol: 10,
};

export const signupSchema = [
  body("username").exists({ checkFalsy: true }).escape().isAlphanumeric(),
  body("firstName"),
  body("lastName"),
  body("email").trim().escape().isEmail().normalizeEmail().custom(emailInUse),
  body("password").isStrongPassword(pwOptions).withMessage(
      "Password must be at least 8 characters long, and contain one uppercase, one lowercase, and one number"
    ).custom(confirmPassword),
 body("picturePath").if(body("picturePath").exists()).isURL(),
];

export const signinSchema = [
    body("email").trim().escape().isEmail().normalizeEmail(),
]
