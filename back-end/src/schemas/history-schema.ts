import Joi from 'joi';

export const historySchema = Joi.object ({
  index: Joi.string().required(),
  name: Joi.string().required(),
  type: Joi.string().required()
});
