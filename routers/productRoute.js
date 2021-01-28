const express = require("express");

const {
  createProduct,
  getAllProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  getproductCount,
  getfeaturedProduct,
} = require("../controller/productcontoller");

const router = express.Router();

router.route("/").get(getAllProduct);
router.route("/create").post(createProduct);
router
  .route("/:id")
  .get(getSingleProduct)
  .put(updateProduct)
  .delete(deleteProduct);
router.route("/get/count").get(getproductCount);
router.route("/get/featured/:count").get(getfeaturedProduct);
module.exports = router;
