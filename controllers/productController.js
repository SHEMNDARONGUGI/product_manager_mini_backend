//Importing the model
const Product = require("../models/Product");



//getting all products
const getProducts = async(req, res) => {
    const product = await Product.find();
    res.json(product);
};

// getting a specific product by id
const getProduct = async(req, res) => {
    const product = await Product.findById(req.params.id);
    res.json(product);
};

// creating a product
const createProduct = async(req, res) => {
    const product = new Product(req.body);
    await product.save();
    res.json(product);
};

// Update a task
const updateProduct = async(req, res)=>{
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.json(updated);
};

// Delete a Task
const deleteProduct = async(req, res) =>{
    await Product.findByIdAndDelete(req.params.id);
    res.json({message: "Deleted"});
};

module.exports = { getProducts, getProduct, createProduct, updateProduct, deleteProduct };
