const express = require('express');
const router = express.Router();

/*
Admin API Router
*/

// import section routes
const sectionRouter = require('./admin.routes/section');
router.use(sectionRouter);

// import category routes
const categoryRouter = require('./admin.routes/category');
router.use(categoryRouter);

// import sort routes
const sortRouter = require('./admin.routes/sort');
router.use(sortRouter);

// import product routes
const productRouter = require('./admin.routes/product');
router.use(productRouter);

// import user routes
const userRouter = require('./admin.routes/user');
router.use(userRouter);

// import suggestion & feedback routes
const suggestionfeedbackRouter = require('./admin.routes/feedback-suggestion');
router.use(suggestionfeedbackRouter);

// import order routes
const orderRouter = require('./admin.routes/order');
router.use(orderRouter);

/*
Client API Router
*/

const clientUserRouter = require('./client.routes/user');
router.use(clientUserRouter);

const clientCartRouter = require('./client.routes/cart');
router.use(clientCartRouter);

/*
Main API Router
*/
const mainProductRouter = require('./main.routes/product');
router.use(mainProductRouter);

const mainLayoutRouter = require('./main.routes/layout');
router.use(mainLayoutRouter);

module.exports = router;
