import sequelize from "../database-connection.js";
import Feedback from '../models/feedback.js';
import Admin from '../models/admin.js';

export const getAllFeedbacks = async (req, res) => {
  try {
    const allFeedbacks = await Feedback.findAll({ include: [Admin] });
    res.status(200).json({
      data: allFeedbacks,
      status: 200,
      success: true,
      message: 'All feedbacks found!',
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

export const getFeedbackById = async (req, res) => {
  try {
    const { id } = req.params;

    const feedback = await Feedback.findByPk(id, { include: [Admin] });

    if (!feedback) {
      return res.status(404).json({
        data: null,
        status: 404,
        success: false,
        message: 'Feedback not found!',
      });
    }

    res.status(200).json({
      data: feedback,
      status: 200,
      success: true,
      message: 'Feedback found!',
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

export const createFeedback = async (req, res) => {
  try {
    const { comment, AdminId } = req.body;

    const newFeedback = await Feedback.create({
      comment: comment,
      AdminId: AdminId, 
    });

    res.status(201).json({
      data: newFeedback,
      status: 201,
      success: true,
      message: 'Feedback created successfully!',
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

export const updateFeedbackById = async (req, res) => {
    try {
      const { id } = req.params;
      const { comment, AdminId } = req.body;
  
      const feedback = await Feedback.findByPk(id);
  
      if (!feedback) {
        return res.status(404).json({
          data: null,
          status: 404,
          success: false,
          message: 'Feedback not found!',
        });
      }
  
      await Feedback.update(
        {
          comment,
          AdminId: AdminId, // Assuming 'adminId' is passed from the request body
        },
        { where: { id } }
      );
  
      const updatedFeedback = await Feedback.findByPk(id);
  
      res.status(200).json({
        data: updatedFeedback,
        status: 200,
        success: true,
        message: 'Feedback updated successfully!',
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
  export const deleteFeedbackById = async (req, res) => {
    try {
      const { id } = req.params;
  
      const feedbackToDelete = await Feedback.findByPk(id);
  
      if (!feedbackToDelete) {
        return res.status(404).json({
          data: null,
          status: 404,
          success: false,
          message: 'Feedback not found!',
        });
      }
  
      await Feedback.destroy({
        where: { id },
      });
  
      res.status(200).json({
        data: null,
        status: 200,
        success: true,
        message: 'Feedback deleted successfully!',
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
    