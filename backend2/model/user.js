const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
    name: String,
    image: String,
    countInStock: Number
});

exports.Product = mongoose.model("Product", productSchema)
