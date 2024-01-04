import sequelize from "../database-connection.js";
import { DataTypes } from "sequelize";

const AdminGoogle = sequelize.define("AdminGoogle", {
  googleId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  displayName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

export default AdminGoogle;
