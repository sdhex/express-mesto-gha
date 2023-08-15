const usersRoutes = require('express').Router();

const {
  getAllUsers,
  getUserById,
  getCurrentUser,
  updateUserInfo,
  updateUserAvatar,
} = require('../controllers/users');

const {
  validateGetUserById,
  validateUpdateUser,
} = require('../utils/validator');

usersRoutes.get('/', getAllUsers);
usersRoutes.get('/me', getCurrentUser);
usersRoutes.get('/:userId', validateGetUserById, getUserById);
usersRoutes.patch('/me', validateUpdateUser, updateUserInfo);
usersRoutes.patch('/me/avatar', validateUpdateUser, updateUserAvatar);

module.exports = usersRoutes;
