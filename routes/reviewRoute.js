import express from 'express';
import {
  getAllReviews,
  getReviewById,
  createReview,
  updateReviewById,
  deleteReviewById,
} from '../controllers/reviewController.js';

const router = express.Router();

// Route to get all reviews
router.get('/', getAllReviews);

// Route to get a review by ID
router.get('/:id', getReviewById);

// Route to create a new review
router.post('/', createReview);

// Route to update a review by ID
router.put('/:id', updateReviewById);

// Route to delete a review by ID
router.delete('/:id', deleteReviewById);

export default router;
