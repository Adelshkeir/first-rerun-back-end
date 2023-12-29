import express from "express";
import * as productController from "../controllers/productController.js";
import Protect from "../middlewares/authMiddleware.js";
import upload from "../multer.js";

const router = express.Router();

router.get("/product", Protect, productController.getAllProducts);
router.get("/product/:id", Protect, productController.getOneProduct);
router.post(
  "/product",
  upload.single("image"),
  Protect,
  productController.createProduct
);
router.put(
  "/product/:id",
  upload.single("image"),
  Protect,
  productController.updateProduct
);
router.delete("/product/:id", Protect, productController.deleteProduct);

export default router;
