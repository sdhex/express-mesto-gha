const routes = require('express').Router();
const usersRoutes = require('./users');
const cardsRoutes = require('./cards');

routes.use('/users', usersRoutes);
routes.use('/cards', cardsRoutes);

module.exports = routes;
