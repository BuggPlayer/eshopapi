const express = require("express");
const {
  createUser,
  getSingleUser,
  getAllUser,
  deleteUser,
  updateUser,
  loginUser,
  userRegister,
  getusertCount,
} = require("../controller/userController");

const router = express.Router();
router.route("/").get(getAllUser);
router.route("/create").post(createUser);
router.route("/login").post(loginUser);
router.route("/:id").put(updateUser).get(getSingleUser).delete(deleteUser);
router.route("/register").post(userRegister);
router.route("/get/usercount").get(getusertCount);
module.exports = router;
