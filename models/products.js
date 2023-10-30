const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    productName: { type: String, required: true },
    description: { type: String, required: true },
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true }, // foreign key
    flavours: [{ type: String, required: true }],
    best_seller: { type: String, required: true },
    price: { type: Number, required: true },
    images: { type: String, required: true },
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;

