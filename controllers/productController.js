//Importing the model
const Product = require("../models/Product");

const asyncErrorHandler = (func) =>{
    return(req, res, next)=> {
        func(req, res, next).catch(err => next(err));
    }
}

// //getting all products
// const getProducts = asyncErrorHandler(
//     async(req, res) => {
//         const product = await Product.find();
//         res.json(product);
// });

// // Implement query parameters for filtering products by category
// const queryByCategory = asyncErrorHandler(
//     async(req, res) => {
//         console.log(req.query);
//         // const product = await Product.find({category: req.query.category});

//         const product = await Product.find().where('category').equals(req.query.category)
//         res.json(product);
// });

const getProducts = asyncErrorHandler(async (req, res) => {
    const { category } = req.query;
    let filter = {};
    if (category) {
        filter.category = category;
    }
    const page = req.query.page;
    const limit = req.query.limit;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const products = await Product.find(filter).skip(startIndex).limit(limit);
    res.status(200).json(products);
});


// getting a specific product by id
const getProduct = asyncErrorHandler(
    async(req, res) => {
    const product = await Product.findById(req.params.id);
    res.json(product);
}
)

// creating a product
const createProduct = asyncErrorHandler(
    async(req, res) => {
    const product = new Product(req.body);
    await product.save();
    res.json(product);
}
)

// Update a Product
const updateProduct = asyncErrorHandler(
    async(req, res)=>{
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.json(updated);
}
)

// Delete a Product
const deleteProduct = asyncErrorHandler(async(req, res) =>{
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });

//Implement query parameters for filtering products by category

});

module.exports = { getProducts, getProduct, createProduct, updateProduct, deleteProduct};
