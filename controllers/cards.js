const Card = require('../models/card');
const {
  CREATED,
} = require('../utils/constants');
const BadRequest = require('../errors/badRequest');
const NotFound = require('../errors/notFound');
const Forbidden = require('../errors/forbidden');

const getAllCards = async (req, res, next) => {
  try {
    const cards = await Card.find({});
    return res.send(cards);
  } catch (err) {
    return next(err);
  }
};

const createCard = async (req, res, next) => {
  try {
    const card = await Card.create({ ...req.body, owner: req.user._id });
    return res.status(CREATED).send(card);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new BadRequest('Переданы некорректные данные при создании карточки'));
    }
    return next(err);
  }
};

const deleteCardById = async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.cardId);
    if (!card) {
      throw new NotFound('Карточка с указанным _id не найдена.');
    }
    if (card.owner.toString() !== req.user._id) {
      return next(new Forbidden('Недостаточно прав для удаления данной карточки'));
    }
    await Card.deleteOne(card);
    return res.send({ message: 'Карточка удалена' });
  } catch (err) {
    if (err.name === 'CastError') {
      return next(new BadRequest('Переданы некорректные данные для удаления карточки.'));
    }
    return next(err);
  }
};

const likeCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );
    if (!card) {
      throw new NotFound('Передан несуществующий _id карточки.');
    }
    return res.send(card);
  } catch (err) {
    if (err.name === 'CastError') {
      return next(new BadRequest('Переданы некорректные данные для постановки лайка.'));
    }
    return next(err);
  }
};

const unlikeCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );
    if (!card) {
      throw new NotFound('Передан несуществующий _id карточки.');
    }
    return res.send(card);
  } catch (err) {
    if (err.name === 'CastError') {
      return next(new BadRequest('Переданы некорректные данные для снятия лайка.'));
    }
    return next(err);
  }
};

module.exports = {
  getAllCards,
  createCard,
  deleteCardById,
  likeCard,
  unlikeCard,
};
