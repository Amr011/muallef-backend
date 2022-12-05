const express = require('express');
const router = express.Router();

const layoutController = require('../../controllers/main.controllers/layout');

// Get All Sections
router
   .route('/api/v1/layout/section')
   .get(layoutController.getAllLayoutSections);

// Get All Categories
router
   .route('/api/v1/layout/category/:sectionId')
   .get(layoutController.getAllLayoutCategories);

// Get All Sorts
router
   .route('/api/v1/layout/sort/:categoryId')
   .get(layoutController.getAllLayoutSorts);

module.exports = router;
