// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const categorySchema = new Schema({
//   categoryName: { type: String, required: true },
// });

// const Category = mongoose.model("Category", categorySchema);

// module.exports = Category;

import sequelize from "../database-connection.js";
import { DataTypes } from "sequelize";

const Category = sequelize.define("Category", {
  categoryName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Category;
