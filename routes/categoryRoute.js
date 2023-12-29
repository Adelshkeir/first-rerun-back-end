import express from "express";
import * as categoryController from "../controllers/categoryController.js";
import Protect from "../middlewares/authMiddleware.js";
import upload from "../multer.js";

const router = express.Router();

router.get("/category", Protect, categoryController.getAllCategories);
router.get("/category/:id", Protect, categoryController.getOneCategory);
router.post(
  "/category",
  upload.single("category_image"),
  Protect,
  categoryController.createCategory
);
router.put(
  "/category/:id",
  upload.single("category_image"),
  Protect,
  categoryController.updateCategory
);
router.delete("/category/:id", Protect, categoryController.deleteCategory);

export default router;
