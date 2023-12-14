// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const ProductSchema = new Schema({
//   productName: { type: String, required: true },
//   description: { type: String, required: true },
//   categoriesId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
//   flavours: [{ type: String, required: true }],
//   bestSeller: { type: Boolean, required: true },
//   price: { type: String, required: true },
//   images: { type: String, required: true },
// });

// const Product = mongoose.model("Product", ProductSchema);

// module.exports = Product;

import sequelize from "../database-connection.js";
import { DataTypes } from "sequelize";
import Category from "./categories.js"; 

const Product = sequelize.define("Product", {
  productName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
//   categoriesId: {
//     type: DataTypes.INTEGER, 
//     allowNull: false,
//   },
//   
flavours: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bestSeller: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  price: {
    type: DataTypes.STRING, // Consider using a numeric type for price, like DECIMAL or FLOAT
    allowNull: false,
  },
  images: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Define associations
Product.belongsTo(Category/*, { foreignKey: 'categoriesId' }*/); // Product belongs to a Category
Category.hasMany(Product); // A Category has many Products

export default Product;
