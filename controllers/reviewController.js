import sequelize from "../database-connection.js";
import Review from '../models/reviews.js';
import Product from '../models/products.js'; 

export const getAllReviews = async (req, res) => {
  try {
    const allReviews = await Review.findAll({ include: [Product] });
    res.status(200).json({
      data: allReviews,
      status: 200,
      success: true,
      message: 'All reviews found!',
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

export const getReviewById = async (req, res) => {
  try {
    const { id } = req.params;

    const review = await Review.findByPk(id, { include: [Product] });

    if (!review) {
      return res.status(404).json({
        data: null,
        status: 404,
        success: false,
        message: 'Review not found!',
      });
    }

    res.status(200).json({
      data: review,
      status: 200,
      success: true,
      message: 'Review found!',
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

export const createReview = async (req, res) => {
  try {
    const { name, reviews, ProductId } = req.body;

    const newReview = await Review.create({
      name: name,
      reviews:reviews,
      ProductId: ProductId,
    });

    res.status(201).json({
      data: newReview,
      status: 201,
      success: true,
      message: 'Review created successfully!',
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

export const updateReviewById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, reviews, ProductId } = req.body;

    const review = await Review.findByPk(id);

    if (!review) {
      return res.status(404).json({
        data: null,
        status: 404,
        success: false,
        message: 'Review not found!',
      });
    }

    await Review.update(
      {
        name,
        reviews,
        ProductId: ProductId,
      },
      { where: { id } }
    );

    const updatedReview = await Review.findByPk(id);

    res.status(200).json({
      data: updatedReview,
      status: 200,
      success: true,
      message: 'Review updated successfully!',
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

export const deleteReviewById = async (req, res) => {
  try {
    const { id } = req.params;

    const reviewToDelete = await Review.findByPk(id);

    if (!reviewToDelete) {
      return res.status(404).json({
        data: null,
        status: 404,
        success: false,
        message: 'Review not found!',
      });
    }

    await Review.destroy({
      where: { id },
    });

    res.status(200).json({
      data: null,
      status: 200,
      success: true,
      message: 'Review deleted successfully!',
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