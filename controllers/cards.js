const Card = require('../models/card');
const {
  ERROR_BAD_REQUEST,
  ERROR_NOT_FOUND,
  ERROR_INTERNAL_SERVER,
} = require('../utils/constants');

const getAllCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    res.send(cards);
  } catch (err) {
    res.status(ERROR_INTERNAL_SERVER).send({
      message: 'Ошибка 500 Internal Server Error',
    });
  }
};

const createCard = async (req, res) => {
  try {
    const card = await Card.create({ ...req.body, owner: req.user._id });
    return res.status(201).send(card);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(ERROR_BAD_REQUEST).send({
        message: 'Переданы некорректные данные при создании карточки',
      });
    }
    return res.status(ERROR_INTERNAL_SERVER).send({
      message: 'Ошибка 500 Internal Server Error',
    });
  }
};

const deleteCardById = async (req, res) => {
  try {
    const card = await Card.findByIdAndDelete(req.params.cardId);
    if (!card) {
      return res.status(ERROR_NOT_FOUND).send({
        message: 'Карточка с указанным _id не найдена.',
      });
    }
    return res.send(card);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(ERROR_BAD_REQUEST).send({
        message: 'Переданы некорректные данные для удаления карточки.',
      });
    }
    return res.status(ERROR_INTERNAL_SERVER).send({
      message: 'Ошибка 500 Internal Server Error',
    });
  }
};

const likeCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );
    if (!card) {
      return res.status(ERROR_NOT_FOUND).send({
        message: 'Передан несуществующий _id карточки.',
      });
    }
    return res.send(card);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(ERROR_BAD_REQUEST).send({
        message: 'Переданы некорректные данные для постановки лайка.',
      });
    }
    return res.status(ERROR_INTERNAL_SERVER).send({
      message: 'Ошибка 500 Internal Server Error',
    });
  }
};

const unlikeCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );
    if (!card) {
      return res.status(ERROR_NOT_FOUND).send({
        message: 'Передан несуществующий _id карточки.',
      });
    }
    return res.send(card);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(ERROR_BAD_REQUEST).send({
        message: 'Переданы некорректные данные для снятии лайка.',
      });
    }
    return res.status(ERROR_INTERNAL_SERVER).send({
      message: 'Ошибка 500 Internal Server Error',
    });
  }
};

module.exports = {
  getAllCards,
  createCard,
  deleteCardById,
  likeCard,
  unlikeCard,
};
