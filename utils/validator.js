const { Joi, celebrate } = require('celebrate');

const regex = /^https?:\/\/[^\s/$.?#]+\.[^\s]*$/;

const validateGetUserById = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
});

const validateCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(regex),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
});

const validateUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
    avatar: Joi.string().pattern(regex),
  }),
});

const validateCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().pattern(regex).required(),
  }),
});

const validateGetCardById = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
});

const validateUpdateUserAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(regex).required(),
  }),
});

module.exports = {
  validateGetUserById,
  validateLogin,
  validateCreateUser,
  validateUpdateUser,
  validateCreateCard,
  validateGetCardById,
  validateUpdateUserAvatar,
};
