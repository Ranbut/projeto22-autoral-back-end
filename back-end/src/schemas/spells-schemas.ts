import Joi from 'joi';

export const createSpellSchema = Joi.object({
  index: Joi.string().required(),
  name: Joi.string().required(),
  range: Joi.string().required(),
  ritual: Joi.boolean().required(),
  duration: Joi.string().required(),
  casting_time: Joi.string().required(),
  level: Joi.number().required(),
  school: {
      name: Joi.string().required(),
  },
  classes: Joi.optional(),
  desc: Joi.optional(),
  components: Joi.optional(),
  material: Joi.required(),
  higher_level: Joi.optional(),
  dc: Joi.optional(),
  damage_type: Joi.optional(),
});
