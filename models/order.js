import sequelize from "../database-connection.js";
import { DataTypes } from "sequelize";
import Orderitems from "./orderitems.js";
const Order = sequelize.define("Order", {
id: {
type: DataTypes.INTEGER,
autoIncrement: true,
primaryKey: true,
},
name: {
type: DataTypes.STRING,
allowNull: false,
},
phonenumber: {
type: DataTypes.INTEGER,
allowNull: false,
},
date :{
type:DataTypes.DATE,
allowNull:false,
}
});

Orderitems.belongsTo(Order);
Order.hasMany(Orderitems);



export default Order;