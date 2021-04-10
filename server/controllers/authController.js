// LOOK INTO EXPRESS VALIDATOR
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import passport from "../middleware/Passport/setup.js";

import User from "../models/user.js";

export const ppLogin = passport.authenticate("local-login");

// TODO CONTINUE FIGURING OUT HOW TO CONNECT THE FRONT END TO BACKEND
export const loginSuccess = (req, res) => {
  console.log(req.session);
  res.send(req.session);
};

export const loginFailure = (req, res) => {
  //console.log(req);
  res.send("Cap");
};

export const signin = async (req, res) => {
  const { email, password } = req.body;
  console.log('You shouldnt be here traveller.');
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

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

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
      return res.status(400).send({ message: "User already exists." });
    }

    if (password !== confirmPassword) {
      return res.status(400).send({ message: "Passwords do not match." });
    }

    // Salt password, default genSalt(10)
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, "test", {
      expiresIn: "1h",
    });

    // Use is not saved? I think create actually makes it so you don't need to save.
    res.status(200).json({ result, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong." });
  }
};
