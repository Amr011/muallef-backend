const express = require('express');
const router = express.Router();

const productController = require('../../controllers/admin.controllers/product');

const { validateToken } = require('../../middleware/authenticate');

const fileUpload = require('../../middleware/upload');
const fileUploadValdiation = require('../../middleware/validator');

// POST Product
router
  .route('/api/v1/product/')
  .post(
    validateToken,
    fileUpload,
    fileUploadValdiation.fileUploadValdiation,
    productController.createProduct
  );

// PUT Product
router
  .route('/api/product/:id')
  .put(
    validateToken,
    fileUpload,
    fileUploadValdiation.fileUploadValdiation,
    productController.updateProduct
  );

// DELETE Product
router
  .route('/api/product/:id')
  .delete(validateToken, productController.deleteProduct);

module.exports = router;
