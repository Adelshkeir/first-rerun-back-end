import asyncHandler from "express-async-handler";
import Category from "../models/categoryModel.js";
import Product from "../models/relations.js";
// import Admin from "../models/relations.js";
import Admin from "../models/adminModel.js";

// @desc    Get categories
// @route   GET /api/categories
// @access  Private
export const getAllCategories = asyncHandler(async (req, res) => {
  const category = await Category.findAll({
    where: { adminId: req.admin.id },
    order: [["id", "DESC"]],
  });
  res.status(200).json(category);
});

// @desc    Get one category
// @route   GET /api/categories/:id
// @access  Private
export const getOneCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await Category.findByPk(id, {
    order: [["id", "DESC"]],
  });
  if (!category) {
    res.status(400);
    throw new Error("Cannot find category");
  }
  res.status(200).json(category);
});

// @desc    Create category
// @route   POST /api/categories
// @access  Private
export const createCategory = asyncHandler(async (req, res) => {
  const image = req.file;
  const { category_name, date } = req.body;
  if (!category_name || !date) {
    res.status(400);
    throw new Error("all fields are required");
  }

  // Check if a category with the same name already exists
  const existingCategory = await Category.findOne({ where: { category_name } });
  if (existingCategory) {
    // If the category exists, send an error message
    res.status(400);
    throw new Error("Category name must be unique.");
  }

  const createdCategory = await Category.create({
    ...req.body,
    category_image: image.path,
    adminId: req.admin.id,
  });
  res.status(200).json(createdCategory);
});

// @desc    Update category
// @route   PUT /api/categories/:id
// @access  Private
export const updateCategory = asyncHandler(async (req, res) => {
  const image = req.file;
  const { id } = req.params;
  const category = await Category.findByPk(id);
  console.log(req);
  if (!category) {
    res.status(400);
    throw new Error("Category not found");
  }

  const admin = await Admin.findOne({ where: { id: req.admin.id } });

  //Check for admin
  if (!admin) {
    res.status(401);
    throw new Error("Admin not found");
  }

  // Make sure the logged in admin matches the admin category
  if (String(category.adminId) !== String(admin.id)) {
    res.status(401);
    throw new Error("Admin not authorized");
  }

  if (!image) {
    await Category.update({ ...req.body }, { where: { id: id } });
    const updatedCategory = await Category.findByPk(id);
    return res.status(200).json(updatedCategory);
  }

  await Category.update(
    { ...req.body, category_image: image.path },
    { where: { id: id } }
  );
  const updatedCategory = await Category.findByPk(id);
  res.status(200).json(updatedCategory);
});

// @desc    Delete category
// @route   DELETE /api/categories/:id
// @access  Private
export const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await Category.findByPk(id);

  const admin = await Admin.findOne({ where: { id: req.admin.id } });

  //Check for admin
  if (!admin) {
    res.status(401);
    throw new Error("Admin not found");
  }

  // Make sure the logged in admin matches the admin category
  if (category.adminId !== admin.id) {
    res.status(401);
    throw new Error("Admin not authorized");
  }

  if (!category) {
    res.status(400);
    throw new Error("Category not found");
  }
  await category.destroy();
  res.status(200).json(category);
});
