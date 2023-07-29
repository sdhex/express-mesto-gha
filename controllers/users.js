const User = require('../models/user');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send({
      message: 'Ошибка 500 Internal Server Error', err,
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.status(200).send(user);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(404).send({
        message: 'Пользователь по указанному _id не найден.',
        err,
      });
    }
    res.status(500).send({
      message: 'Ошибка 500 Internal Server Error',
      err,
    });
  }
  return null;
};

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).send({
        message: 'Переданы некорректные данные при создании пользователя',
        err,
      });
    }
    res.status(500).send({
      message: 'Ошибка 500 Internal Server Error', err,
    });
  }
  return null;
};

const updateUserInfo = async (req, res) => {
  try {
    const { name, about } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true },
    );
    res.status(200).send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).send({
        message: 'Переданы некорректные данные при обновлении профиля.',
        err,
      });
    }
    if (err.name === 'CastError') {
      return res.status(404).send({
        message: 'Пользователь по указанному _id не найден.',
        err,
      });
    }
    res.status(500).send({ message: 'Ошибка 500 Internal Server Error', err }); // Переделать ошибки
  }
  return null;
};

const updateUserAvatar = async (req, res) => {
  try {
    const { avatar } = req.body;
    const user = await User.findByIdAndUpdate(req.user._id, { avatar });
    res.status(200).send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).send({
        message: 'Переданы некорректные данные при обновлении аватара.',
        err,
      });
    }
    if (err.name === 'CastError') {
      return res.status(404).send({
        message: 'Пользователь по указанному _id не найден.',
        err,
      });
    }
    res.status(500).send({ message: 'Ошибка 500 Internal Server Error', err }); // Переделать ошибки
  }
  return null;
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUserInfo,
  updateUserAvatar,
};
