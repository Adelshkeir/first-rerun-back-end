

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
flavours: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bestSeller: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  price: {
    type: DataTypes.STRING, 
    allowNull: false,
  },
  images: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Define associations
Product.belongsTo(Category)
Category.hasMany(Product);

export default Product;