const User = require('../models/user');
const {
  ERROR_BAD_REQUEST,
  ERROR_NOT_FOUND,
  ERROR_INTERNAL_SERVER,
} = require('../utils/constants');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.send(users);
  } catch (err) {
    return res.status(ERROR_INTERNAL_SERVER).send({
      message: 'Ошибка 500 Internal Server Error',
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(ERROR_NOT_FOUND).send({
        message: 'Пользователь по указанному _id не найден.',
      });
    }
    return res.send(user);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(ERROR_BAD_REQUEST).send({
        message: 'Пользователь по указанному _id не найден.',
      });
    }
    return res.status(ERROR_INTERNAL_SERVER).send({
      message: 'Ошибка 500 Internal Server Error',
    });
  }
};

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    return res.status(201).send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(ERROR_BAD_REQUEST).send({
        message: 'Переданы некорректные данные при создании пользователя',
      });
    }
    return res.status(ERROR_INTERNAL_SERVER).send({
      message: 'Ошибка 500 Internal Server Error',
    });
  }
};

const updateUserInfo = async (req, res) => {
  try {
    const { name, about } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true },
    );
    if (!user) {
      return res.status(ERROR_NOT_FOUND).send({
        message: 'Пользователь по указанному _id не найден.',
      });
    }
    return res.send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(ERROR_BAD_REQUEST).send({
        message: 'Переданы некорректные данные при обновлении профиля.',
      });
    }
  }
  return res.status(ERROR_INTERNAL_SERVER).send({
    message: 'Ошибка 500 Internal Server Error',
  });
};

const updateUserAvatar = async (req, res) => {
  try {
    const { avatar } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true },
    );
    if (!user) {
      return res.status(ERROR_NOT_FOUND).send({
        message: 'Пользователь по указанному _id не найден.',
      });
    }
    return res.send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(ERROR_BAD_REQUEST).send({
        message: 'Переданы некорректные данные при обновлении аватара.',
      });
    }
    return res.status(ERROR_INTERNAL_SERVER).send({
      message: 'Ошибка 500 Internal Server Error',
    });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUserInfo,
  updateUserAvatar,
};
