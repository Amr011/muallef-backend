const express = require('express')
const router = express.Router()

const sortController = require('../../controllers/admin.controllers/sort')
const { validateToken } = require('../../middleware/authenticate')
const pageAuthorize = require('../../middleware/authorize')

const fileUpload = require('../../middleware/upload')
const fileUploadValdiation = require('../../middleware/validator')

// GET All Sort
router
  .route('/api/sort')
  .get(validateToken, pageAuthorize, sortController.getAllSort)

// GET Single Sort
router.route('/api/sort/:id').get(validateToken, sortController.getSingleSort)

// POST Sort
router
  .route('/api/sort')
  .post(
    validateToken,
    fileUpload,
    fileUploadValdiation.fileUploadValdiation,
    sortController.createSort
  )

// PUT Sort
router
  .route('/api/sort/:id')
  .put(
    validateToken,
    fileUpload,
    fileUploadValdiation.fileUploadValdiation,
    sortController.updateSort
  )

// DELETE Sort
router
  .route('/api/category/:id')
  .delete(validateToken, sortController.deleteSort)

module.exports = router
