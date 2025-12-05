const express = require('express');
const router = express.Router();
const authController = require('../controllers/authcontroller');
const userController = require('../controllers/usercontroller');

router.post('/register', authController.handleRegister);
router.post('/login', authController.handleLogin);module.exports = router;
router.post('/forgot-password', userController.forgotPassword); 
router.post('/reset-password', userController.resetPassword);