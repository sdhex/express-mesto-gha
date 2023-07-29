const routes = require('express').Router();
const usersRoutes = require('./users');
const cardsRoutes = require('./cards');

routes.use('/users', usersRoutes);
routes.use('/cards', cardsRoutes);
routes.use('/*', (req, res) => {
  res.status(404).send({
    message: 'Страница не найдена',
  });
});

module.exports = routes;
