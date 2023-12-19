import express from "express";
import * as categoryController from "../controllers/categoryController.js";
import upload from "../multer.js";

const router = express.Router();

router.get("/category", categoryController.getAllCategories);
router.get("/category/:id", categoryController.getOneCategory);
router.post(
  "/category",
  upload.single("category_image"),
  categoryController.createCategory
);
router.patch(
  "/category/:id",
  upload.single("category_image"),
  categoryController.updateCategory
);
router.delete("/category/:id", categoryController.deleteCategory);

export default router;
