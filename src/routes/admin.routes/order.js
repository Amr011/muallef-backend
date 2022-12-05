const express = require('express')

const router = express.Router()

const { validateToken } = require('../../middleware/authenticate')
const orderController = require('../../controllers/admin.controllers/order')
const orderClientController = require('../../controllers/client.controllers/order')
const reviewController = require('../../controllers/client.controllers/review')

router.route('/api/order').get(validateToken, orderController.orderCreation)
router
  .route('/api/orderview')
  .get(validateToken, orderClientController.getAllOrder)

router.route('/api/review').post(validateToken, reviewController.createReview)

module.exports = router
