const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    richDescription: {
        type: String,
        default: ""
    },

    image: {
        type: String,
        default: ""
    },

    images: [{
        type: String
    }],

    price: {
        type: Number,
        default: 0
    },

    brand: {
        type: String,
        default: ""
    },

    //Same as a joiner model in ruby with sql
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required: true
    },
    
    countInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },

    rating: {
        type: Number,
        default: 0
    },

    isFeatured: {
        type: Boolean,
        default: false
    },

    dateCreated: {
        type: Date,
        default: Date.now
    }
});

//Removes default _id from the id field
productSchema.virtual("id").get(function(){
    return this._id.toHexString();
});

productSchema.set("toJSON", {
    virtuals: true
});

exports.Product = mongoose.model("Product", productSchema)
