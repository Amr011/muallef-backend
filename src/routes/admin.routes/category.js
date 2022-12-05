const express = require("express");
const router = express.Router();

const categoryController = require("../../controllers/admin.controllers/category");
const { validateToken } = require("../../middleware/authenticate");

const fileUpload = require("../../middleware/upload");
const fileUploadValdiation = require("../../middleware/validator");

// GET All Category
router
  .route("/api/category")
  .get(validateToken, categoryController.getAllCategory);

// GET Single Category
router
  .route("/api/category/:id")
  .get(validateToken, categoryController.getSingleCategory);

// POST Category
router
  .route("/api/category")
  .post(
    validateToken,
    fileUpload,
    fileUploadValdiation.fileUploadValdiation,
    categoryController.createCategory
  );

// PUT Category
router
  .route("/api/category/:id")
  .put(
    validateToken,
    fileUpload,
    fileUploadValdiation.fileUploadValdiation,
    categoryController.updateCategory
  );

// DELETE Category
router
  .route("/api/category/:id")
  .delete(validateToken, categoryController.deleteCategory);

module.exports = router;
