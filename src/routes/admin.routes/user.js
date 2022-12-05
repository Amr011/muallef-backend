const express = require('express')

const router = express.Router()

const userController = require('../../controllers/admin.controllers/user')

const { validateToken } = require('../../middleware/authenticate')

// // Register new user
// router.route('/api/register').post(userController.userRegister)

// // Login with exist user
// router.route('/api/login').post(userController.userLogin)

// // logout with exist user
// router.route('/api/logout').get(validateToken, userController.userLogOut)

// // profile page with validation
// router.route('/api/profile').get(validateToken, userController.userProfile)

module.exports = router
