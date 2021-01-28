const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    require: true,
  },
  richDescription: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    require: true,
  },

  images: [{ type: String }],
  brand: {
    type: String,
    require: true,
  },

  price: {
    type: Number,
    default: 0,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    require: true,
  },
  countInStock: {
    type: Number,
    require: true,
    min: 0,
    max: 100,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

productSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

productSchema.set("toJSON", {
  virtuals: true,
});
module.exports = mongoose.model("Products", productSchema);
