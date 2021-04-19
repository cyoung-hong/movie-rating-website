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
  //console.log(req);
  res.send("Cap");
};

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist." });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials." });

    res.status(200).json({ result: existingUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const signup = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      //throw createError(400, 'User already exists');
      //return next(new Error("User already exists"));
      return res.status(400).send({ error: "User already exists." });
    }

    if (password !== confirmPassword) {
      return res.status(400).send({ error: "Passwords do not match." });
    }

    // Salt password, default genSalt(10)
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    // Use is not saved? I think create actually makes it so you don't need to save.
    res.status(200).json({ username: result.name });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong." });
  }
};
