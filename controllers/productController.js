import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler';

// @desc    Get products
// @route   GET /api/products
// @access  Private
export const getAllProducts = asyncHandler(async (req, res) => {
    const product = await Product.findAll()
    res.status(200).json(product)
})

// @desc    Get one product
// @route   GET /api/products/:id
// @access  Private
export const getOneProduct = asyncHandler(async (req, res) => {
    const { id } = req.params
    const product = await Product.findByPk(id)
    if (!product) {
        res.status(400)
        throw new Error('Cannot find product')
    }
    res.status(200).json(product)
})


// @desc    Create product
// @route   POST /api/products
// @access  Private
export const createProduct = asyncHandler(
        async (req, res) => {
        console.log(req.body)
        if (!req.body) {
            res.status(400)
            throw new Error('Cannot create product')
        }
        try {
            
            const product = await Product.create(req.body)
            res.status(200).json(product)
            return
        } catch (error) {
            console.log(error.message)
            return
        }
    }
)

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private
export const updateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params
    const product = await Product.findByPk(id)

    if (!product) {
        res.status(400)
        throw new Error('Product not found')
    }

    await Product.update({ ...req.body }, { where: { id: id } })
    const updatedProduct = await Product.findByPk(id)
    res.status(200).json(updatedProduct)

})


// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private
export const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params
    const product = await Product.findByPk(id)

    if (!product) {
        res.status(400)
        throw new Error('Product not found')
    }
    await product.destroy()
    res.status(200).json(product)
})