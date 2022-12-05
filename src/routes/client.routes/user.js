const express = require('express');
const router = express.Router();

const userController = require('../../controllers/client.controllers/user');
const { validateToken } = require('../../middleware/authenticate');

// Register New User
router.route('/api/v1/user/register').post(userController.userRegister);

// Login By Exsiting User
router.route('/api/v1/user/login').post(userController.userLogin);

// Logout By Exsiting User
router
   .route('/api/v1/user/logout')
   .get(validateToken, userController.userLogout);

// Get All Users
router.route('/api/v1/user/').get(validateToken, userController.userGetAll);

// Get User By Id
router
   .route('/api/v1/user/profile/:id')
   .get(validateToken, userController.userGetSingle);

// Get Logged In User Profile
router
   .route('/api/v1/user/porfile')
   .get(validateToken, userController.userProfile);

// Update Logged In User Profile
router
   .route('/api/v1/user/profile')
   .put(validateToken, userController.userUpdate);

// Delete Logged In User Profile
router
   .route('/api/v1/user/profile')
   .delete(validateToken, userController.userDelete);

module.exports = router;
