import express from "express";
import {
  getAllAdmins,
  getAdminById,
  createAdmin,
  updateAdminById,
  deleteAdminById,
} from "../controllers/AdminController.js";

const router = express.Router();

router.get("/", getAllAdmins);
router.get("/:id", getAdminById);
router.post("/", createAdmin);
router.patch("/:id", updateAdminById);
router.delete("/:id", deleteAdminById);

export default router;
