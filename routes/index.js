const routes = require('express').Router();
const usersRoutes = require('./users');
const cardsRoutes = require('./cards');
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const NotFound = require('../errors/notFound');
const {
  validateCreateUser,
  validateLogin,
} = require('../utils/validator');

routes.post('/signin', validateLogin, login);
routes.post('/signup', validateCreateUser, createUser);

routes.use(auth);
routes.use('/users', usersRoutes);
routes.use('/cards', cardsRoutes);
routes.use('/*', (req, res, next) => {
  next(new NotFound('Страница не найдена'));
});

module.exports = routes;
