import Category from "./categoryModel.js";
import Product from "./productModel.js";
import Admin from "./adminModel.js";

Category.hasMany(Product, {
  foreignKey: "categoryId",
  allowNull: false,
  onDelete: "CASCADE",
});
Product.belongsTo(Category, { foreignKey: "categoryId", allowNull: false });

Admin.hasMany(Product, {
  foreignKey: "adminId",
  allowNull: false,
});
Product.belongsTo(Admin, { foreignKey: "adminId", allowNull: false });


Admin.hasMany(Category, {
  foreignKey: 'adminId',
  as: 'category',
 });
 
 Category.belongsTo(Admin, {
  foreignKey: 'adminId',
  as: 'admin',
 });
 


// relationalModel.js
export default {
  Category,
  Product,
  Admin,
};
