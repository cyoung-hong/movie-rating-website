import { body } from "express-validator";
import User from "../../models/User.js";

export const emailInUse = (value) => {
  return User.findOne({ email: value })
  .then((user) => {
    if (user) {
      return Promise.reject("E-mail already in use");
    }
  });
};

export const confirmPassword = (value, {req} ) => {
    if(value !== req.body.confirmPassword){
        throw new Error('Passwords do not match');
    }
    return true;
}
