import Category from "./categoryModel.js";
import Product from "./productModel.js";

Category.hasMany(Product, { foreignKey: "categoryId", allowNull: false, onDelete: 'CASCADE' });
Product.belongsTo(Category, { foreignKey: "categoryId", allowNull: false });

export { Category, Product }