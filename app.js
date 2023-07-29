const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const routes = require('./routes');
const limiter = require('./middlewares/rate-limiter');

const { PORT = 3000 } = process.env;

const app = express();
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

app.use((req, res, next) => {
  req.user = {
    _id: '64c1c8f3c0b7111116dfd305',
  };

  next();
});

app.use(limiter);
app.use(routes);
app.use(helmet());

app.listen(PORT);
