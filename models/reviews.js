import sequelize from "../database-connection.js";
import { DataTypes } from "sequelize";


const Review = sequelize.define("Review", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  reviews: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

export default Review;