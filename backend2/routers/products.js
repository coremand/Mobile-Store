const express = require("express");
const router = express.Router();
const {Product} = require("../model/product");
const {Category} = require("../model/category");
const mongoose = require("mongoose");
const multer = require("multer");

//MIME TYPE
const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
}

//Setting up user photo upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error('invalid image type');
    if(isValid) {
        uploadError = null
    }
    cb(uploadError, 'photos/uploads')
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.split(" ").join("-");
    const extension = FILE_TYPE_MAP[file.mimetype];
    cb(null, `${fileName}-${Date.now()}.${extension}`)
  }
});
 
const upload = multer({ storage: storage })




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
 
router.post(`/`, upload.single("image"), async (req, res) => {
    //Verify Category
    const category = await Category.findById(req.body.category);
    if(!category)
    return res.status(400).send("Invalid Category");
    //verify image field
    const file = req.file;
    if(!file) return res.status(400).send("Please Upload an Image");
     const newFileName = req.file.filename
     const base_PATH = `${req.protocol}://${req.get("host")}/photos/uploads/`//adding host url for a request
    let product =  new Product({
        name: req.body.name,
        image: `${base_PATH}${newFileName}`,
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

router.put(
    '/gallery-images/:id', 
    upload.array('images', 10), 
    async (req, res)=> {
        console.log("ERRORR ERRRROR ERRROR ERRROR")
        if(!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).send('Invalid Product Id')
         }
         const files = req.files
         let imagesPaths = [];
         const basePath = `${req.protocol}://${req.get('host')}/photos/uploads/`;

         if(files) {
            files.map(file =>{
                imagesPaths.push(`${basePath}${file.filename}`);
            })
         }

         const product = await Product.findByIdAndUpdate(
            req.params.id,
            {
                images: imagesPaths
            },
            { new: true}
        )

        if(!product)
            return res.status(500).send('the gallery cannot be updated!')

        res.send(product);
    }
)

module.exports = router;