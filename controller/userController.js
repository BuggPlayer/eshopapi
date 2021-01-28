const userModel = require("../models/user");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//@desc Get all user
//@router GET api/v1/user
//@access users
exports.getAllUser = async (req, res) => {
  try {
    const getalluser = await userModel.find();
    res.status(200).json({ success: true, data: getalluser });
    if (!getalluser) {
      res.status(500).json({ success: false, message: "data not found " });
    }
  } catch (error) {
    res.status(404).json({ success: false, error: error.mesage });
  }
};

//@desc get single user
//@router  GET api/v1/user/:id
//@access user
exports.getSingleUser = async (req, res) => {
  //check point for id
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send("Invalid Product Id");
  }

  try {
    const getsingleuser = await userModel.findById(req.params.id);
    res.status(200).json({ success: true, data: getsingleuser });

    if (!getsingleuser) {
      res.status(500).json({ success: false, message: "data not found" });
    }
  } catch (error) {
    res.status(404).json({ success: false, message: error.mesage });
  }
};

//@desc Post create user
//@router api/v1/
//@access
exports.createUser = async (req, res) => {
  try {
    const createuser = await userModel.create({
      ...req.body,
      passwordHash: bcrypt.hashSync(req.body.password, 10),
    });

    res.status(200).json({ success: true, data: createuser });

    if (!createuser) {
      res.status(500).json({ success: false, mesage: "user not find" });
    }
  } catch (error) {
    res.status(200).json({ success: false, error: error.mesage });
  }
};

//@desc Login  user
//@router Post /api/v1/user/:id
//@access user
exports.loginUser = async (req, res) => {
  const user = await userModel.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).json({ success: false, message: "user no found" });
  }

  if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
    const token = jwt.sign(
      {
        userId: user.id,
        isAdmin: user.isAdmin,
      },
      "secret",
      { expiresIn: "1d" }
    );

    return res.status(200).send({ user: user.email, token: token });
  } else {
    res.status(400).send("passs is wrong");
  }
};

//@desc update user data
//@router PUT /api/v1/user/:id
//@access admin
exports.updateUser = async (req, res) => {
  //check point for id
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send("Invalid Product Id");
  }

  try {
    const updateuser = await userModel.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        email: req.body.email,
        passwordHash: req.body.passwordHash,
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        street: req.body.street,
        apartment: req.body.apartment,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country,
      },
      {
        new: true,
      }
    );
    res.status(200).json({ success: true, data: updateuser });
    if (!updateuser) {
      res.status(500).json({ success: false, messageL: "data not found" });
    }
  } catch (error) {
    res.status(404).json({ success: false, message: error.mesage });
  }
};

//@desc delete user
//@router DELETE api/v1/user/:id
//@access admin
exports.deleteUser = async (req, res) => {
  //check point for id
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send("Invalid Product Id");
  }
  try {
    const deleteuser = await userModel.findByIdAndRemove(req.params.id);
    res.status(200).json({ success: true, data: deleteuser });

    if (!deleteuser) {
      res.status(500).json({ success: false, message: "data not found" });
    }
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

//@desc Regiser  user
//@router POST api/v1/user/register
//@access user
exports.userRegister = async (req, res) => {
  try {
    const userregister = await userModel.create({
      ...req.body,
      passwordHash: bcrypt.hashSync(req.body.password, 10),
    });

    res.status(200).json({ success: true, data: userregister });

    if (!userregister) {
      res.status(500).json({ success: false, mesage: "user not find" });
    }
  } catch (error) {
    res.status(200).json({ success: false, error: error.mesage });
  }
};

/// STATISTIC get COUNT
exports.getusertCount = async (req, res) => {
  const getusercount = await userModel.countDocuments((count) => count);
  res.status(200).json({ success: true, Product_count: getusercount });
  if (!getusercount) {
    res.status(500).json({ success: false, message: "count not found" });
  }
  res.status(404).json({ success: false, message: "issueee" });
};
