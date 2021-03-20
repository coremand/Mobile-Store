const express = require('express')
const app = express()
const port = 3000
const bodyParser = require("body-parser");
const morgan = require("morgan")
const mongoose = require('mongoose');
const { request } = require('express');

//Read environment Variables
require("dotenv/config")
const baseLink = process.env.BASE_URL
const dbLink = process.env.SERVER_URL

//Middlewares
app.use(bodyParser.json());
app.use(morgan("tiny"))


const productSchema = mongoose.Schema({
    name: String,
    image: String,
    countInStock: Number
});
const Product = mongoose.model("Product", productSchema)

app.get(`${baseLink}/products`, async (req, res) => {
   const productList = await Product.find();
   if(!productList){
       res.status(500).json({success: false})
   }
   res.send(productList)
});

app.post(`${baseLink}/products`, (req, res) => {
    const product = new Product({
        name: req.body.name,
        image: req.body.image,
        countInStock: req.body.countInStock

    });
    product.save().then((createdProduct => {
        res.status(201).json(createdProduct)
    })).catch((err) => {
        res.status(500).json({
            error: err,
            success: false
        })
    })
});


mongoose.connect(dbLink, {useNewUrlParser: true, useUnifiedTopology: true, dbName: "E-Shop"})
.then(() => {
    console.log("CONNECTION SUCCESSFUL")
})
.catch((err) => {
    console.log(err)
});

app.listen(port, () => {
  console.log(`Server is up at http://localhost:${port}`)
})