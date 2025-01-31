import sequelize from "../database-connection.js";
import { DataTypes } from "sequelize";


const Category = sequelize.define('Category', {
    category_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    category_image: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },

});

export default Category;
