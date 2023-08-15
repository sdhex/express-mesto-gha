const routes = require('express').Router();
const usersRoutes = require('./users');
const cardsRoutes = require('./cards');
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const NotFound = require('../errors/notFound');

routes.post('/signin', login);
routes.post('/signup', createUser);

routes.use(auth);
routes.use('/users', usersRoutes);
routes.use('/cards', cardsRoutes);
routes.use('/*', (req, res, next) => {
  next(new NotFound('Страница не найдена'));
});

module.exports = routes;
