const mongoose = require("mongoose");
const { uuid } = require("uuid");

const productSchema = new mongoose.Schema({
    name: { type: String, required: true},
    description: {type: String, required: false},
    price: { type: Number, required: true},
    category: {type: String},
    inStock: {type: Boolean, default: true}
});

module.exports = mongoose.model("Product", productSchema);