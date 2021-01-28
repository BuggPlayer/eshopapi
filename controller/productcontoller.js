const productModel = require("../models/product");
const categoryModel = require("../models/Category");
const mongoose = require("mongoose");


// @desc  get all prodcuts
//@ route GET api/v1/product
//@access user
exports.getAllProduct = async (req, res) => {
  // product search by category
  //example localhost//300/api/v1/product?category=222,345
  let filter = {};
  if (req.query.categories) {
    filter = { category: req.query.categories.split(",") };
  }

  try {
    //select() is used for ispesicfiaction of data -id is hidde data from list
    const productList = await productModel.find(filter);

    res.status(200).json({ success: true, message: productList });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc  find single  products
//@ route GET api/v1/product/:id
//@access user
exports.getSingleProduct = async (req, res) => {
  console.log("req", req.body);
  const singleProduct = await productModel
    .findById(req.params.id)
    .populate("category");

  if (!singleProduct) {
    res.status(500).json({ success: false, message: "no data" });
  }
  res.status(200).json({ success: true, message: singleProduct });
};

// @desc  create  products
//@ route POSt api/v1/createproduct
//@access Admin
exports.createProduct = async (req, res) => {
  //checking for categorrry id
  const category = await categoryModel.findById(req.body.category);
  if (!category) res.send("Invalid Categry");

  try {
    const product = await productModel.create(req.body);
    res.status(200).json({ success: true, data: product });

    //checkpoint
    if (!product) {
      res.status(500).json({ success: false, message: "data not found" });
    }
    res.send(product);
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc  update  products
//@ route PUT api/v1/product/:id
//@access Admin
exports.updateProduct = async (req, res) => {
  //check point for id
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send("Invalid Product Id");
  }

  const updateProduct = await productModel.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      description: req.body.description,
      richDescription: req.body.richDescription,
      image: req.body.image,
      brand: req.body.brand,
      price: req.body.price,
      category: req.body.category,
      countInStock: req.body.countInStock,

      isFeatured: req.body.isFeatured,
    },
    { new: true }
  );
  if (!updateProduct) {
    res.status(500).json({ success: false, message: "something wrong..." });
  }
  res.status(200).json({ success: true, data: updateProduct });
};

// @desc  delete  products
//@ route DELETE api/v1/product/:id
//@access Admin
exports.deleteProduct = async (req, res) => {
  const deleteProduct = await productModel.findByIdAndRemove(req.params.id);

  if (!deleteProduct) {
    res.status(500).json({ success: false, message: "somthing wrong" });
  }
  res.status(200).json({ success: true, data: "deleteProduct" });
};

/// STATISTIC get COUNT
exports.getproductCount = async (req, res) => {
  const getproductcount = await productModel.countDocuments((count) => count);
  res.status(200).json({ success: true, Product_count: getproductcount });
  if (!getproductcount) {
    res.status(500).json({ success: false, message: "count not found" });
  }
  res.status(404).json({ success: false, message: "issueee" });
};

/// featured  product
exports.getfeaturedProduct = async (req, res) => {
  const count = req.params.count ? req.params.count : 0;
  const getfeaturedproduct = await productModel
    .find({ isFeatured: true })
    .limit(+count);
  res
    .status(200)
    .json({ success: true, featured_products: getfeaturedproduct });
  if (!getfeaturedproduct) {
    res.status(500).json({ success: false, message: "featured not found" });
  }
  res.status(404).json({ success: false, message: "issueee" });
};