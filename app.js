const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const routes = require('./routes');
const limiter = require('./middlewares/rate-limiter');

const { PORT = 3000 } = process.env;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(errors());

app.use((err, res, req, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500
      ? 'На сервере произошла ошибка'
      : message,
  });
  next();
});

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(helmet());
app.use(limiter);
app.use(routes);

app.listen(PORT);
