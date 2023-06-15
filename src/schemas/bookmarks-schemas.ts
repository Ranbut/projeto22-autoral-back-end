import Joi from 'joi';

export const bookmarkSchema = Joi.object ({
  index: Joi.string().required(),
  name: Joi.string().required(),
});
