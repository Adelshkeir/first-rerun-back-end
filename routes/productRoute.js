import express from "express";
import * as productController from "../controllers/productController.js";
import upload from "../multer.js";

const router = express.Router();

router.get("/product", productController.getAllProducts);
router.get("/product/:id", productController.getOneProduct);
router.post(
  "/product",
  upload.single("image"),
  productController.createProduct
);
router.patch(
  "/product/:id",
  upload.single("image"),
  productController.updateProduct
);
router.delete("/product/:id", productController.deleteProduct);

export default router;

