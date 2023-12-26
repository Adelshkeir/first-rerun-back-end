import sequelize from "../database-connection.js";
import { DataTypes } from "sequelize";

const Product = sequelize.define('Product', {
    product_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
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
