const express = require("express");
const router = express.Router();
const {Product} = require("../model/product");
const {Category} = require("../model/category");
const mongoose = require("mongoose");




router.get(`/`, async (req, res) => {

    //Filter Products by Category
    let filter = {}
    if(req.query.categories){
        filter = {category: req.query.categories.split(",")}
    }

    const productList = await Product.find(filter).populate("category");
    if(!productList){
        res.status(500).json({success: false})
    }
    res.send(productList)
});
 
router.post(`/`, async (req, res) => {
    //Verify Category
    const category = await Category.findById(req.body.category);
    if(!category)
    return res.status(400).send("Invalid Category")

    let product =  new Product({
        name: req.body.name,
        image: req.body.image,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        richDescription: req.body.richDescription,
        description: req.body.description
    });

    product = await product.save();

    if(!product){
        return res.status(404).send("Product not found")
    }else{
        res.send(product)
    }

});

//Delete One Product
router.delete("/:id", async (req,res) => {
    deleteProduct = await Product.findByIdAndRemove(req.params.id).catch(err => {
        return res.status(400).json({success: false, error:err})
    });

    if(deleteProduct){
        return res.status(200).json({success: true, message:"Deletion was successful"})
    }else {
        return res.status(404).json({success: false, message:"Product not found"})
    }
    
});



//Get one Product

router.get("/:id", async(req,res) => {
    const product = await Product.findById(req.params.id).populate("category");

    if(!product){
        res.status(500).json({success: false})
    }
    res.send(product);
  
    
});

//Update product
router.put("/:id", async(req,res) => {

    //Verify Product id
    if(!mongoose.isValidObjectId(req.params.id)){
        res.status(400).send("Invalid Product Id")
    }
     
    //Verify Category
     const category = await Category.findById(req.body.category);
     if(!category)
        return res.status(400).send("Invalid Category")
 
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        image: req.body.image,
        countInStock: req.body.productInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        richDescription: req.body.richDescription,
        description: req.body.description
  }, 
  //Returns the new updated Product
   {new: true});

  

  if(!updatedProduct)
  return res.status(404).send("the Product cannot be created!")

  res.send(updatedProduct);
});

//Get the number of products in stock
router.get("/get/count", async(req,res) => {
    const productCount = await Product.countDocuments((count) => count)

    if(!productCount){
        res.status(500).json({success: false})
    }
    res.send({
        productCount: productCount
    });
});

//Gets Featured Products
router.get("/get/featured/:count", async(req,res) => {
    const count = req.params.count ? req.params.count : 0
    const products = await Product.find({isFeatured: true}).limit(+count)

    if(!products){
        res.status(500).json({success: false})
    }
    res.send(products);
});

 

module.exports = router;