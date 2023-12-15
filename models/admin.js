// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const AdminSchema = new Schema({
//     email: { type: String, required: true },
//     password: { type: String, required: true },
    
// });

// const Admin = mongoose.model("Admin", AdminSchema);

// module.exports = Admin;

import sequelize from "../database-connection.js";
import { DataTypes } from "sequelize";

const Admin = sequelize.define("Admin", {
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
