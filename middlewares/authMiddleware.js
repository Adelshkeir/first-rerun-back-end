import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import Admin from "../models/adminModel.js";

const Protect = asyncHandler(async (req, res, next) => {
  let token;
  //when the token is sent in authorization header (check)
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      //split to turn it into an array of 2 elements because it is written as bearer token and we want the token which is on index 1
      token = req.headers.authorization.split(" ")[1];

      //Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get admin from the token
      //decoded.id (id that we set in the admin controller in generateToken function)
      const admin = await Admin.findByPk(decoded.id, {
        attributes: { exclude: ["password"] }, // Exclude the password field
      });
      //so we can access the admin in any protected route
      req.admin = admin;

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

export default Protect;
