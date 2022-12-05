const express = require('express');
const router = express.Router();

const sectionController = require('../../controllers/admin.controllers/section');

const { validateToken } = require('../../middleware/authenticate');

const fileUpload = require('../../middleware/upload');
const fileUploadValdiation = require('../../middleware/validator');

// GET All Section
router
   .route('/api/section')
   .get(validateToken, sectionController.getAllSection);

// GET Single Section
router
   .route('/api/section/:id')
   .get(validateToken, sectionController.getSingleSection);

// POST Section
router
   .route('/api/section')
   .post(
      validateToken,
      fileUpload,
      fileUploadValdiation.fileUploadValdiation,
      sectionController.createSection
   );

// PUT Section
router
   .route('/api/section/:id')
   .put(
      validateToken,
      fileUpload,
      fileUploadValdiation.fileUploadValdiation,
      sectionController.updateSection
   );

// DELETE Section
router
   .route('/api/section/:id')
   .delete(validateToken, sectionController.deleteSection);

module.exports = router;
