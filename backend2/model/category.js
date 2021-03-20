const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    },

    color: {
        type: String
    },

    icon: {
        type: String
    },

    image: {
        type: String,
        default: ""
    }
});

//Removes default _id from the id field
categorySchema.virtual("id").get(function(){
    return this._id.toHexString();
});

categorySchema.set("toJSON", {
    virtuals: true
});

exports.Category = mongoose.model("Category", categorySchema)
