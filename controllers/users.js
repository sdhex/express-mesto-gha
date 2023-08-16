const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  JWT_SECRET,
  CREATED,
} = require('../utils/constants');
const BadRequest = require('../errors/badRequest');
const NotFound = require('../errors/notFound');
const Conflict = require('../errors/conflict');
const Unauthorized = require('../errors/unauthorized');

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    return res.send(users);
  } catch (err) {
    return next(err);
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    return res.send(user);
  } catch (err) {
    return next(err);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      throw new NotFound('Пользователь по указанному _id не найден.');
    }
    return res.send(user);
  } catch (err) {
    return next(err);
  }
};

const createUser = async (req, res, next) => {
  try {
    const {
      name, about, avatar, email, password,
    } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name, about, avatar, email, password: hashedPassword,
    });
    user.password = undefined;
    return res.status(CREATED).send(user);
  } catch (err) {
    if (err.code === 11000) {
      return next(new Conflict('Пользователь с данной почтой уже зарегистрирован'));
    }
    if (err.name === 'ValidationError') {
      return next(new BadRequest('Переданы некорректные данные при создании пользователя'));
    }
    return next(err);
  }
};

const updateUserInfo = async (req, res, next) => {
  try {
    const { name, about } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true },
    );
    if (!user) {
      throw new NotFound('Пользователь по указанному _id не найден.');
    }
    return res.send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new BadRequest('Переданы некорректные данные при обновлении пользователя'));
    }
    return next(err);
  }
};

const updateUserAvatar = async (req, res, next) => {
  try {
    const { avatar } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true },
    );
    if (!user) {
      throw new NotFound('Пользователь по указанному _id не найден.');
    }
    return res.send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new BadRequest('Переданы некорректные данные при обновлении аватара'));
    }
    return next(err);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new Unauthorized('Проверьте правильность ввода почты и пароля');
    }
    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new Unauthorized('Проверьте правильность ввода почты и пароля');
    }

    return res.cookie('jwt', token, {
      maxAge: 3600000 * 24 * 7,
      httpOnly: true,
    }).send({ message: 'All okay' });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  getAllUsers,
  getCurrentUser,
  getUserById,
  createUser,
  updateUserInfo,
  updateUserAvatar,
  login,
};
