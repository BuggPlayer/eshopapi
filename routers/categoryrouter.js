const express = require("express");
const {
  createCategory,
  getallCategory,
  getSinglecategory,
  updateCaegory,
  deleteCategory,
} = require("../controller/categoryController");

const router = express.Router();

router.route("/").get(getallCategory);
router.route("/create").post(createCategory);
router
  .route("/:id")
  .get(getSinglecategory)
  .put(updateCaegory)
  .delete(deleteCategory);
module.exports = router;
