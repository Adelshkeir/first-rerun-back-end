import Product from "../models/productModel.js";
import Category from "../models/categoryModel.js";
import asyncHandler from "express-async-handler";
import Admin from "../models/adminModel.js";

// @desc    Get products
// @route   GET /api/products
// @access  Private
export const getAllProducts = asyncHandler(async (req, res) => {
  const product = await Product.findAll({
    where: { adminId: req.admin.id },
    order: [["id", "DESC"]],
    include: [
      {
        model: Category,
      },
    ],
  });
  res.status(200).json(product);
});

// @desc    Get one product
// @route   GET /api/products/:id
// @access  Private
export const getOneProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByPk(id, {
    order: [["id", "DESC"]],
    include: [
      {
        model: Category,
      },
    ],
  });
  if (!product) {
    res.status(400);
    throw new Error("Cannot find product");
  }
  res.status(200).json(product);
});

// @desc    Create product
// @route   POST /api/products
// @access  Private
export const createProduct = asyncHandler(async (req, res) => {
  const image = req.file;
  const {
    product_name,
    description,
    flavours,
    bestSeller,
    price,
    category_name,
  } = req.body;
  if (
    !product_name ||
    !description ||
    !flavours ||
    !bestSeller ||
    !price ||
    !category_name
  ) {
    res.status(400);
    throw new Error("Cannot create product");
  }
  // Check if a product with the same name already exists
  const existingProduct = await Product.findOne({ where: { product_name } });
  if (existingProduct) {
    // If the product exists, send an error message
    res.status(400);
    throw new Error("Product name must be unique.");
  }

  const category = await Category.findOne({
    where: { category_name: category_name },
  });
  if (!category) {
    res.status(400);
    throw new Error("Cannot find category");
  }
  const product = await Product.create({
    ...req.body,
    image: image.path,
    categoryId: category.id,
    adminId: req.admin.id,
  });
  res.status(200).json(product);
});

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private
export const updateProduct = asyncHandler(async (req, res) => {
  const image = req.file;
  const { id } = req.params;
  const product = await Product.findByPk(id);

  if (!product) {
    res.status(400);
    throw new Error("Product not found");
  }

  const admin = await Admin.findOne({ where: { id: req.admin.id } });

  //Check for admin
  if (!admin) {
    res.status(401);
    throw new Error("Admin not found");
  }

  // Make sure the logged in admin matches the admin product
  if (String(product.adminId) !== String(admin.id)) {
    res.status(401);
    throw new Error("Admin not authorized");
  }


  await Product.update(
    { ...req.body, image: image.path },
    { where: { id: id } }
  );
  const updatedProduct = await Product.findByPk(id);
  res.status(200).json(updatedProduct);
});

// @desc    Delete product
// @route   Delete /api/products/:id
// @access  Private
export const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByPk(id);


  const admin = await Admin.findOne({ where: { id: req.admin.id } });

  //Check for admin
  if (!admin) {
    res.status(401);
    throw new Error("Admin not found");
  }

  // Make sure the logged in admin matches the admin product
  if (product.adminId !== admin.id) {
    res.status(401);
    throw new Error("Admin not authorized");
  }

  if (!product) {
    res.status(400);
    throw new Error("Product not found");
  }
  await product.destroy();
  res.status(200).json(product);
});
