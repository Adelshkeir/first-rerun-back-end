import express from 'express';
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategoryById,
  deleteCategoryById,
} from '../controllers/categoryController.js'; 

const router = express.Router();

// Route to get all categories
router.get('/', getAllCategories);

// Route to get a category by ID
router.get('/:id', getCategoryById);

// Route to create a new category
router.post('/', createCategory);

// Route to update a category by ID
router.put('/:id', updateCategoryById);

// Route to delete a category by ID
router.delete('/:id', deleteCategoryById);

export default router;
