import sequelize from "../database-connection.js";
import { DataTypes } from "sequelize";

const Orderitems = sequelize.define("Orderitems", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  itemname: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default Orderitems;
