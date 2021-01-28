const mongoose = require("mongoose");
const categoryModel = require("../models/Category");

//@desc get all category
//@route api/v1/category
//@ access user
exports.getallCategory = async (req, res) => {
  const getallcategory = await categoryModel.find();

  if (!getallcategory) {
    res.status(500).json({ success: false, message: "category not found !" });
  }
  res.status(200).json({ success: true, data: getallcategory });
};

//@desc get single category
//@router GET api/v1/category/:id
//@access user

exports.getSinglecategory = async (req, res) => {
  //check point for id
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send("Invalid Product Id");
  }
  try {
    const getsinglecategory = await categoryModel.findById(req.params.id);

    if (!getsinglecategory) {
      res.status(500).json({ success: false, message: "data not found" });
    }
    res.status(200).json({ success: true, message: getsinglecategory });
  } catch (error) {
    res.status(500).json({ success: true, error: error.message });
  }
};

// @desc  create  category
//@ route POSt api/v1/create categort
//@access Admin
exports.createCategory = async (req, res) => {
  console.log("body", req.body);
  try {
    const createcategory = await categoryModel.create(req.body);
    console.log("create", createcategory);
    res
      .status(200)
      .json({ success: true, message:createcategory });

    //checkpoint
    if (!createcategory) {
      res.status(500).json({ success: false, message: "no category" });
    }
    res.send(createcategory);
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

//@desc update  update category
//@route  PUT api/v1/category/:id
//@ access admin

exports.updateCaegory = async (req, res) => {
  //check point for id
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send("Invalid Product Id");
  }

  try {
    const updatecategory = await categoryModel.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color,
      },
      { new: true }
    );

    if (!updatecategory) {
      res.status(500).json({ success: false, message: "data not found" });
    }
    res.status(200).json({ success: true, data: updatecategory });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

//@desc delete delete category
//@router DELETE api/v1/category/:id
//@access admin
exports.deleteCategory = async (req, res) => {
  //check point for id
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send("Invalid Product Id");
  }
  try {
    const deletecategory = await categoryModel.findByIdAndRemove(req.params.id);
    if (!deletecategory) {
      res.status(500).json({ success: false, message: "data not found" });
    }
    res.status(200).json({ success: true, data: "deleted" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
