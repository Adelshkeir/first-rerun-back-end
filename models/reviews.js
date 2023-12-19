import sequelize from "../database-connection.js";
import { DataTypes } from "sequelize";
import Product from "./productModel.js";

const Review = sequelize.define("Review", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  review: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Product.hasMany(Review);
Review.belongsTo(Product);

export default Review;
