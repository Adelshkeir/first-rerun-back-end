import Category from '../models/categoryModel.js';
import asyncHandler from 'express-async-handler';

// @desc    Get categories
// @route   GET /api/categories
// @access  Private
export const getAllCategories = asyncHandler(async (req, res) => {
    const category = await Category.findAll()
    res.status(200).json(category)
})

// @desc    Get one category
// @route   GET /api/categories/:id
// @access  Private
export const getOneCategory = asyncHandler(async (req, res) => {
    const { id } = req.params
    const category = await Category.findByPk(id)
    if (!category) {
        res.status(400)
        throw new Error('Cannot find category')
    }
    res.status(200).json(category)
})


// @desc    Create category
// @route   POST /api/categories
// @access  Private
export const createCategory = asyncHandler(async (req, res) => {
    if (!req.body.value) {
        res.status(400)
        throw new Error('Cannot create category')
    }
    const category = await Category.create(req.body)
    res.status(200).json(category)
})

// @desc    Update category
// @route   PUT /api/categories/:id
// @access  Private
export const updateCategory = asyncHandler(async (req, res) => {
    const { id } = req.params
    const category = await Category.findByPk(id)

    if (!category) {
        res.status(400)
        throw new Error('Category not found')
    }

    await Category.update({ ...req.body }, { where: { id: id } })
    const updatedCategory = await Category.findByPk(id)
    res.status(200).json(updatedCategory)

})


// @desc    Update category
// @route   PUT /api/categories/:id
// @access  Private
export const deleteCategory = asyncHandler(async (req, res) => {
    const { id } = req.params
    const category = await Category.findByPk(id)

    if (!category) {
        res.status(400)
        throw new Error('Category not found')
    }
    await category.destroy()
    res.status(200).json(category)
})