const express = require("express");
const router = express.Router();
const {User} = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');




router.get(`/`, async (req, res) => {
    const userList = await User.find().select("-passwordHash");
    if(!userList){
        res.status(500).json({success: false})
    }
    res.send(userList)
});
 
router.post(`/`, async (req, res) => {
     let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password, 10),
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        street: req.body.street,
        apartment: req.body.apartment,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country,
 
    });

    user = await newUser.save();
    if(!user){
        res.status(500).json({success: false})
    }
    res.send(user)
     
});

//Show one User
router.get("/:id", async(req, res) => {
    const user = await (await User.findById(req.params.id)).select("-passwordHash");

    if(!user){
        res.status(500).json({message: "User not found"})
    }
    res.status(200).send(user);
});
 
router.post("/login", async(req,res) => {
    const user = await User.findOne({email: req.body.email});
    const secret = process.env.secret
    if(!user) {
        return res.status(400).send('User not found');
    }
    //Verify User password
    if(user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
        const token = jwt.sign(
            {
                userId: user.id,
                isAdmin: user.isAdmin
            },
            secret,
            {expiresIn : '2d'}
        )
       
        res.status(200).send({user: user.email , token: token}) 
    } else {
       res.status(400).send('password is wrong!');
    }
});

router.post(`/register`, async (req, res) => {
    let newUser = new User({
       name: req.body.name,
       email: req.body.email,
       passwordHash: bcrypt.hashSync(req.body.password, 10),
       phone: req.body.phone,
       isAdmin: req.body.isAdmin,
       street: req.body.street,
       apartment: req.body.apartment,
       zip: req.body.zip,
       city: req.body.city,
       country: req.body.country,

   });

   user = await newUser.save();
   if(!user){
       res.status(500).json({success: false})
   }
   res.send(user)
    
});

//Get the number of users in stock
router.get("/get/count", async(req,res) => {
    const userCount = await User.countDocuments((count) => count)

    if(!userCount){
        res.status(500).json({success: false})
    }
    res.send({
        userCount: userCount
    });
});

//Delete One User
router.delete("/:id", async (req,res) => {
    deleteUser = await User.findByIdAndRemove(req.params.id).catch(err => {
        return res.status(400).json({success: false, error:err})
    });

    if(deleteUser){
        return res.status(200).json({success: true, message:"Deletion was successful"})
    }else {
        return res.status(404).json({success: false, message:"Category not found"})
    }
});


module.exports = router;