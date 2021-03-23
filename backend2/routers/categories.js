const express = require("express");
const router = express.Router();
const {Category} = require("../model/category")




router.get(`/`, async (req, res) => {
    const categoryList = await Category.find();
    if(!categoryList){
        res.status(500).json({success: false})
    }
    res.send(categoryList)
});
 
router.post(`/`, async (req, res) => {
    let category = new Category({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color
 
    });
    category = await category.save();
    
    if(!category){
        return res.status(404).send("Invalid Category")
    }
    res.send(category)

});

//Delete One Category
router.delete("/:id", async (req,res) => {
    deleteCategory = await Category.findByIdAndRemove(req.params.id).catch(err => {
        return res.status(400).json({success: false, error:err})
    });

    if(deleteCategory){
        return res.status(200).json({success: true, message:"Deletion was successful"})
    }else {
        return res.status(404).json({success: false, message:"Category not found"})
    }
});

//Show one category
router.get("/:id", async(req, res) => {
    const category = await Category.findById(req.params.id);

    if(!category){
        res.status(500).json({message: "Category Id not found"})
    }
    res.status(200).send(category);
});


//Update Category

router.put("/:id", async (req,res) => {
    const category = await Category.findByIdAndUpdate( req.params.id,{
          name: req.body.name,
          icon: req.body.icon,
          color: req.body.color
    }, 
    //Returns the new updated Category
     {new: true});

    

    if(!category)
    return res.status(404).send("the category cannot be created!")

    res.send(category);

});

module.exports = router;