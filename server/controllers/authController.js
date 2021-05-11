// LOOK INTO EXPRESS VALIDATOR
import bcrypt from "bcryptjs";
import passport from "../middleware/Passport/setup.js";

import User from "../models/User.js";

export const ppLogin = passport.authenticate("local-login");

export const loginTest = passport.authenticate("local-login", {
  successRedirect: "/api/auth/login-success",
  failureRedirect: "/api/auth/login-failure",
});

export const loginSuccess = (req, res) => {
  console.log(req.user);
  const user = req.user;
  res.send(user);
};

export const loginFailure = (req, res) => {
  res.send("Cap");
};

export const signin = async (req, res) => {
  try {
    const { _id, username, picturePath } = req.user;
    const user = {
      id: _id,
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

    res.status(200).json({ message: `${username} successfully created!` });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong." });
  }
};
