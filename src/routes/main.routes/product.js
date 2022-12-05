const express = require('express');
const router = express.Router();

const productController = require('../../controllers/main.controllers/prodcut');
const { validateToken } = require('../../middleware/authenticate');

// Product Pagination with Sales & Reviews V2
router
  .route('/api/v1/products')
  .get(productController.getAllProductPaginatedIncludeSalesAndReviewV2);

// Get ALl Top Rated Products
router.route('/api/v1/topRated').get(productController.getTopRattedProducts);
// Get All Top Selling Products
router.route('/api/v1/topSelling').get(productController.getTopSellingProducts);

// Get Single Product By Id
router
  .route('/api/v1/product/product/:productId')
  .get(productController.getSingleProductById);

// Get User Purchases
router
  .route('/api/v1/purchase')
  .get(validateToken, productController.getUserPurchase);

// Get User Salles
router
  .route('/api/v1/salles')
  .get(validateToken, productController.getUserSalles);

module.exports = router;
