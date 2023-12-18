import Admin from '../models/admin.js';
import sequelize from "../database-connection.js";


export const getAllAdmins = async (req, res) => {
  try {
    const allAdmins = await Admin.findAll();
    res.status(200).json({
      data: allAdmins,
      status: 200,
      success: true,
      message: 'All admins found!',
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

export const getAdminById = async (req, res) => {
  try {
    const { id } = req.params;

    const admin = await Admin.findByPk(id);

    if (!admin) {
      return res.status(404).json({
        data: null,
        status: 404,
        success: false,
        message: 'Admin not found!',
      });
    }

    res.status(200).json({
      data: admin,
      status: 200,
      success: true,
      message: 'Admin found!',
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

export const createAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const newAdmin = await Admin.create({
      email,
      password,
    });

    res.status(201).json({
      data: newAdmin,
      status: 201,
      success: true,
      message: 'Admin created successfully!',
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

export const updateAdminById = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, password } = req.body;

    const admin = await Admin.findByPk(id);

    if (!admin) {
      return res.status(404).json({
        data: null,
        status: 404,
        success: false,
        message: 'Admin not found!',
      });
    }

    await Admin.update(
      {
        email,
        password,
      },
      { where: { id } }
    );

    const updatedAdmin = await Admin.findByPk(id);

    res.status(200).json({
      data: updatedAdmin,
      status: 200,
      success: true,
      message: 'Admin updated successfully!',
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

export const deleteAdminById = async (req, res) => {
  try {
    const { id } = req.params;

    const adminToDelete = await Admin.findByPk(id);

    if (!adminToDelete) {
      return res.status(404).json({
        data: null,
        status: 404,
        success: false,
        message: 'Admin not found!',
      });
    }

    await Admin.destroy({
      where: { id },
    });

    res.status(200).json({
      data: null,
      status: 200,
      success: true,
      message: 'Admin deleted successfully!',
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