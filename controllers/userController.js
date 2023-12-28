import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // Check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  //checking if user is created
  if (user) {
    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Invalid Credentials");
  }

  // Check for user email
  const user = await User.findOne({ email });
  //if user and password are correct return the user data
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Credentials");
  }
});

export const getUser = asyncHandler(async (req, res) => {
    //req.user.id that we set in the middleware
  const { id, name, email } = await User.findByPk(req.user.id);

  res.status(200).json({
    id: id,
    name,
    email,
  });
});

// Generate JWT
export const generateToken = (id) => {
  //this will sign a new token with the id passed in with the used secret and will expire in 1 day
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};
