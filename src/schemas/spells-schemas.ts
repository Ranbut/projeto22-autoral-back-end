import Joi from 'joi';

export const createSpellSchema = Joi.object({
  spell: Joi.object().required()
});
