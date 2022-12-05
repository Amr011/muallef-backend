const express = require('express');
const router = express.Router();
const { validateToken } = require('../../middleware/authenticate');
const cartController = require('../../controllers/client.controllers/cart');

// Get All Cart Data
router.route('/api/v1/cart').get(validateToken, cartController.readCart);

// Get Cart Data Count
router
  .route('/api/v1/cart/count')
  .get(validateToken, cartController.getCartCount);

// Create New Cart Item
router
  .route('/api/v1/cart/:productId')
  .post(validateToken, cartController.createCart);

// Update Exsisting Cart Item
router.route('/api/v1/cart').put(validateToken, cartController.updateCart);

// Delete Exsisting Cart Item
router
  .route('/api/v1/cart/:productId')
  .delete(validateToken, cartController.deleteCart);

// Clear Cart Data
router.route('/api/v1/cart').delete(validateToken, cartController.clearCart);

module.exports = router;
