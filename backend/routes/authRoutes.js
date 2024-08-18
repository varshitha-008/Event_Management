const express = require('express');
const {
  registerUser,
  loginUser,
  getUserProfile,
  requestAdminAccess,
  checkAdmin,
} = require('../controllers/authController');
const { protect ,admin} = require('../middleware/authMiddleware');
// const { registerUser } = require('../controllers/authController');

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', registerUser);

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', loginUser);

// @route   GET /api/auth/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', protect, getUserProfile);


router.post('/request-admin-access', protect, requestAdminAccess);


router.get('/check-admin', protect, checkAdmin);



module.exports = router;
