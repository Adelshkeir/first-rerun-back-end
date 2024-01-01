import express from "express";
import * as adminController from "../controllers/adminController.js";

const router = express.Router();

import Protect from "../middlewares/authMiddleware.js";

router.post("/register", adminController.registerAdmin);
router.post("/login", adminController.loginAdmin);
router.get("/me", Protect, adminController.getAdmin);

export default router;
