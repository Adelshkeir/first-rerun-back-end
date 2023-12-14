
import Product from '../models/products.js';
import sequelize from "../database-connection.js"
export const getAllProducts = async (req, res) => {
  try {
    const allProducts = await Product.findAll({include: [ Category]});
    res.status(200).json({
      data: allProducts,
      status: 200,
      success: true,
      message: 'All products found!',
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

export const getProductById = async (req, res) => {
    try {
      const { id } = req.params;
  
      const product = await Product.findByPk(id,{include: [ Category]});
  
      if (!product) {
        return res.status(404).json({
          data: null,
          status: 404,
          success: false,
          message: 'Product not found!',
        });
      }
  
      res.status(200).json({
        data: product,
        status: 200,
        success: true,
        message: 'Product found!',
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

  export const createProduct = async (req, res) => {
    try {
      const {
        productName,
        description,
        flavours,
        bestSeller,
        price,
        images,
      } = req.body;
  
      const newProduct = await Product.create({
        productName,
        description,
        flavours,
        bestSeller,
        price,
        images,
      });
  
      res.status(201).json({
        data: newProduct,
        status: 201,
        success: true,
        message: 'Product created successfully!',
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

  
  export const updateProductById = async (req, res) => {
    try {
      const { id } = req.params;
      const {
        productName,
        description,
        flavours,
        bestSeller,
        price,
        images,
      } = req.body;
  
      const product = await Product.findByPk(id);
  
      if (!product) {
        return res.status(404).json({
          data: null,
          status: 404,
          success: false,
          message: 'Product not found!',
        });
      }
  
      await Product.update(
        {
          productName,
          description,
          flavours,
          bestSeller,
          price,
          images,
        },
        { where: { id } }
      );
  
      const updatedProduct = await Product.findByPk(id);
  
      res.status(200).json({
        data: updatedProduct,
        status: 200,
        success: true,
        message: 'Product updated successfully!',
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

  export const deleteProductById = async (req, res) => {
    try {
      const { id } = req.params;
  
      const productToDelete = await Product.findByPk(id);
  
      if (!productToDelete) {
        return res.status(404).json({
          data: null,
          status: 404,
          success: false,
          message: 'Product not found!',
        });
      }
  
      await Product.destroy({
        where: { id },
      });
  
      res.status(200).json({
        data: null,
        status: 200,
        success: true,
        message: 'Product deleted successfully!',
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
  