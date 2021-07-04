// LOOK INTO EXPRESS VALIDATOR
import bcrypt from "bcryptjs";
import passport from "../middleware/Passport/setup.js";

import User from "../models/User.js";

export const ppLogin = passport.authenticate("local-login");

export const loginTest = passport.authenticate("local-login", {
  successRedirect: "/api/auth/login-success",
  failureRedirect: "/api/auth/login-failure",
});

export const signin = async (req, res) => {
  try {
    const { _id, username, picturePath } = req.user;
    const user = {
      _id: _id,
      username,
      picturePath,
    };
    res.status(200).json({ user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const signup = async (req, res) => {
  const { username, firstName, lastName, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ error: "User already exists." });
    }

    // Salt password, default genSalt(10)
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const result = await User.create({
      username,
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    if(result) {
      res.status(200).json({ 
        user: {
          _id: result._id,
          username: result.username,
          picturePath: result.picturePath,
        },
        message: `${result.username} successfully created!` });
    }
  } catch (err) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const changePassword = async (req, res) => {};

export const isAuthenticated = async (req,res) => {
  if(req.user) {
    return res.status(200).json({authenticated: true});}
  else {
    return res.status(401).json({authenticated: false});
  }
}