  import jwt from "jsonwebtoken";
  import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import Admin from "../models/adminModel.js";

export const registerAdmin = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
console.log(req.body)
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // Check if admin exists
  const adminExists = await Admin.findOne({ where: { email } });

  if (adminExists) {
    res.status(400);
    throw new Error("Admin already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Create admin
  const admin = await Admin.create({
    name,
    email,
    password: hashedPassword,
  });
  //checking if admin is created
  if (admin) {
    res.status(201).json({
      id: admin.id,
      name: admin.name,
      email: admin.email,
      token: generateToken(admin.id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Admin Data");
  }
});

export const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Invalid Credentials");
  }

  // Check for admin email
  const admin = await Admin.findOne({ where: { email } });
  //if admin and password are correct return the admin data
  if (admin && (await bcrypt.compare(password, admin.password))) {
    res.json({
      id: admin.id,
      name: admin.name,
      email: admin.email,
      token: generateToken(admin.id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Credentials");
  }
});

export const getAdmin = asyncHandler(async (req, res) => {
  //req.admin.id that we set in the middleware
  const { id, name, email } = await Admin.findByPk(req.admin.id);

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
