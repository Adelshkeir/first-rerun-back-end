import Category from "./categoryModel.js";
import Product from "./productModel.js";

Category.hasMany(Product, { foreignKey: { name: "categoryId", allowNull: false } });
Product.belongsTo(Category, { foreignKey: { name: "categoryId", allowNull: false } });

export {Category, Product}