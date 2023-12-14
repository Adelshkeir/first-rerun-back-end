import sequelize from "../database-connection.js";
import { DataTypes } from "sequelize";

const Product = sequelize.define('Product', {
    product_name: {
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
    image: {
        type: DataTypes.STRING,
        allowNull: false,
    },

})


export default Product;



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