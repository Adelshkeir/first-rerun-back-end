// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const ReviewSchema = new Schema({
//     name: { type: String, required: true },
//     reviews: { type: String, required: true },
//     productId: { type: Schema.Types.ObjectId, ref: 'products', required: true }, // foreign key
// });

// const Review = mongoose.model("Review", ReviewSchema);

// module.exports = Review;

import sequelize from "../database-connection.js";
import { DataTypes } from "sequelize";
import Product from "./products.js"; 

const Review = sequelize.define("Review", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  reviews: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // productId: {
  //   type: DataTypes.INTEGER, 
  //   allowNull: false,
  // },
});

// Define associations
Review.belongsTo(Product/*, { foreignKey: 'productId' }*/); // Review belongs to a Product
Product.hasMany(Review); // A Product has many Reviews

export default Review;

