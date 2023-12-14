import Category from '../models/categories.js';
import sequelize from "../database-connection.js"

export const getAllCategories = async (req, res) => {
  try {
    const allCategories = await Category.findAll();
    res.status(200).json({
      data: allCategories,
      status: 200,
      success: true,
      message: 'All categories found!',
    });
  } catch (err) {
    res.status(500).json({
      data: null,
      status: 500,
      success: false,
      message: err.message,
    });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({
        data: null,
        status: 404,
        success: false,
        message: 'Category not found!',
      });
    }

    res.status(200).json({
      data: category,
      status: 200,
      success: true,
      message: 'Category found!',
    });
  } catch (err) {
    res.status(500).json({
      data: null,
      status: 500,
      success: false,
      message: err.message,
    });
  }
};

export const createCategory = async (req, res) => {
  try {
    const { categoryName } = req.body;
    const existingCategory = await Category.findOne({ where: { categoryName } });

    if (existingCategory) {
      return res.status(409).json({
        data: null,
        status: 409,
        success: false,
        message: 'Category with this name already exists!',
      });
    }

    const newCategory = await Category.create({ categoryName });

    res.status(201).json({
      data: newCategory,
      status: 201,
      success: true,
      message: 'Category created successfully!',
    });
  } catch (err) {
    res.status(400).json({
      data: null,
      status: 400,
      success: false,
      message: err.message,
    });
  }
};

export const updateCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const { categoryName } = req.body;
    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({
        data: null,
        status: 404,
        success: false,
        message: 'Category not found!',
      });
    }

    await Category.update({ categoryName }, { where: { id } });
    const updatedCategory = await Category.findByPk(id);

    res.status(200).json({
      data: updatedCategory,
      status: 200,
      success: true,
      message: 'Category updated successfully!',
    });
  } catch (err) {
    res.status(500).json({
      data: null,
      status: 500,
      success: false,
      message: err.message,
    });
  }
};

export const deleteCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const categoryToDelete = await Category.findByPk(id);

    if (!categoryToDelete) {
      return res.status(404).json({
        data: null,
        status: 404,
        success: false,
        message: 'Category not found!',
      });
    }

    await Category.destroy({ where: { id } });

    res.status(200).json({
      data: null,
      status: 200,
      success: true,
      message: 'Category deleted successfully!',
    });
  } catch (err) {
    res.status(500).json({
      data: null,
      status: 500,
      success: false,
      message: err.message,
    });
  }
};
