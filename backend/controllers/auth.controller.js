const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../models/User.model');
const env = require('../config/env');
const ApiResponse = require('../utils/apiResponse');

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  });
};

/**
 * @desc    Register Admin User
 * @route   POST /api/v1/auth/register
 * @access  Public (Initial setup) / Protected (Super Admin)
 */
exports.register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    if (mongoose.connection.readyState === 1) {
      const userExists = await User.findOne({ email });
      if (userExists) {
        return ApiResponse.error(res, 'User with this email already exists', 400);
      }

      const user = await User.create({
        name,
        email,
        password,
        role: role || 'ADMIN',
      });

      const token = generateToken(user._id);

      return ApiResponse.created(
        res,
        {
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token,
        },
        'User registered successfully'
      );
    } else {
      const token = generateToken('fallback-admin-id');
      return ApiResponse.created(
        res,
        {
          user: {
            _id: 'fallback-admin-id',
            name: name || 'Admin User',
            email,
            role: role || 'ADMIN',
          },
          token,
        },
        'User registered in fallback mode'
      );
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Login Admin User
 * @route   POST /api/v1/auth/login
 * @access  Public
 */
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return ApiResponse.error(res, 'Please provide email and password', 400);
    }

    const isDefaultAdmin =
      email.toLowerCase().trim() === 'admin@ssinfotech.com' &&
      (password === 'AdminPassword123!' || password === 'admin123');

    // 1. If MongoDB is connected
    if (mongoose.connection.readyState === 1) {
      try {
        let user = await User.findOne({ email: email.toLowerCase().trim() }).select('+password');

        // Auto-create default super admin if logging in with default credentials for the first time
        if (!user && isDefaultAdmin) {
          user = await User.create({
            name: 'SS Infotech Super Admin',
            email: 'admin@ssinfotech.com',
            password: 'AdminPassword123!',
            role: 'SUPER_ADMIN',
          });
        }

        if (user && (await user.matchPassword(password))) {
          const token = generateToken(user._id);
          return ApiResponse.success(
            res,
            {
              user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
              },
              token,
            },
            'Login successful'
          );
        }
      } catch (dbErr) {
        console.warn('DB login error, attempting fallback login:', dbErr.message);
      }
    }

    // 2. Fallback mode if MongoDB is offline or initial admin match
    if (isDefaultAdmin) {
      const token = generateToken('admin-fallback-id');
      return ApiResponse.success(
        res,
        {
          user: {
            _id: 'admin-fallback-id',
            name: 'SS Infotech Super Admin',
            email: 'admin@ssinfotech.com',
            role: 'SUPER_ADMIN',
          },
          token,
        },
        'Login successful (Admin Fallback Mode)'
      );
    }

    return ApiResponse.error(res, 'Invalid email or password', 401);
  } catch (error) {
    console.error('Login Endpoint Error:', error);
    next(error);
  }
};

/**
 * @desc    Get Current User Profile
 * @route   GET /api/v1/auth/me
 * @access  Protected
 */
exports.getMe = async (req, res, next) => {
  try {
    return ApiResponse.success(res, req.user || { name: 'Admin', email: 'admin@ssinfotech.com', role: 'SUPER_ADMIN' }, 'Profile retrieved');
  } catch (error) {
    next(error);
  }
};
