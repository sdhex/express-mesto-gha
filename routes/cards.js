const cardsRoutes = require('express').Router();

const {
  getAllCards,
  createCard,
  deleteCardById,
  likeCard,
  unlikeCard,
} = require('../controllers/cards');

const {
  validateCreateCard,
  validateGetCardById,
} = require('../utils/validator');

cardsRoutes.get('/', getAllCards);
cardsRoutes.post('/', validateCreateCard, createCard);
cardsRoutes.delete('/:cardId', validateGetCardById, deleteCardById);
cardsRoutes.put('/:cardId/likes', validateGetCardById, likeCard);
cardsRoutes.delete('/:cardId/likes', validateGetCardById, unlikeCard);

module.exports = cardsRoutes;
