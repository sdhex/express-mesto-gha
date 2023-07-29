const usersRoutes = require('express').Router();

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUserInfo,
  updateUserAvatar,
} = require('../controllers/users');

usersRoutes.get('/', getAllUsers);
usersRoutes.get('/:userId', getUserById);
usersRoutes.post('/', createUser);
usersRoutes.patch('/me', updateUserInfo);
usersRoutes.patch('/me/avatar', updateUserAvatar);

module.exports = usersRoutes;
