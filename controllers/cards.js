const Card = require('../models/card');

const getAllCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    res.status(200).send(cards);
  } catch (err) {
    res.status(500).send({
      message: 'Ошибка 500 Internal Server Error', err,
    });
  }
};

const createCard = async (req, res) => {
  try {
    const card = await Card.create({ ...req.body, owner: req.user._id });
    res.status(201).send(card);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).send({
        message: 'Переданы некорректные данные при создании карточки',
        err,
      });
    }
    res.status(500).send({
      message: 'Ошибка 500 Internal Server Error', err,
    });
  }
  return null;
};

const deleteCardById = async (req, res) => {
  try {
    const card = await Card.findByIdAndDelete(req.params.cardId);
    res.status(200).send(card);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(404).send({
        message: ' Карточка с указанным _id не найдена.',
        err,
      });
    }
    res.status(500).send({
      message: 'Ошибка 500 Internal Server Error', err,
    });
  }
  return null;
};

const likeCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );
    res.status(200).send(card);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).send({
        message: 'Переданы некорректные данные для постановки лайка.',
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

const unlikeCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );
    res.status(200).send(card);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).send({
        message: 'Переданы некорректные данные для снятии лайка.',
        err,
      });
    }
    if (err.name === 'CastError') {
      return res.status(404).send({
        message: 'Передан несуществующий _id карточки.',
        err,
      });
    }
    res.status(500).send({ message: 'Ошибка 500 Internal Server Error', err }); // Переделать ошибки
  }
  return null;
};

module.exports = {
  getAllCards,
  createCard,
  deleteCardById,
  likeCard,
  unlikeCard,
};
