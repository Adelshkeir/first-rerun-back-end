import sequelize from "../database-connection.js";
import { DataTypes } from "sequelize";

const Admin = sequelize.define("Admin", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default Admin;