const cardsRoutes = require('express').Router();

const {
  getAllCards,
  createCard,
  deleteCardById,
  likeCard,
  unlikeCard,
} = require('../controllers/cards');

cardsRoutes.get('/', getAllCards);
cardsRoutes.post('/', createCard);
cardsRoutes.delete('/:cardId', deleteCardById);
cardsRoutes.put('/:cardId/likes', likeCard);
cardsRoutes.delete('/:cardId/likes', unlikeCard);

module.exports = cardsRoutes;
