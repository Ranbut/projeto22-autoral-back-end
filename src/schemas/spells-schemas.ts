import Joi from 'joi';

export const spellSchema = Joi.object({
  index: Joi.string().required(),
  name: Joi.string().required(),
  desc: Joi.array().items(Joi.string()).required(),
  higher_level: Joi.array().items(Joi.string()),
  range: Joi.string().required(),
  components: Joi.array().items(Joi.string()).required(),
  material: Joi.string(),
  ritual: Joi.boolean().required(),
  duration: Joi.string().required(),
  concentration: Joi.boolean().required(),
  casting_time: Joi.string().required(),
  level: Joi.number().required(),
  damage: Joi.object({
    damage_type: Joi.object({
      index: Joi.string().required(),
      name: Joi.string().required(),
    }).required(),
    damage_at_slot_level: Joi.object().pattern(Joi.string(), Joi.string()).required()
  }),
  dc: Joi.object({
    dc_type: Joi.object({
      index: Joi.string().required(),
      name: Joi.string().required(),
    }).required(),
    dc_success: Joi.string().required()
  }),
  area_of_effect: Joi.object({
    type: Joi.string().required(),
    size: Joi.number().required()
  }),
  school: Joi.object({
    index: Joi.string().required(),
    name: Joi.string().required(),
  }).required(),
  classes: Joi.array().items(Joi.object({
    index: Joi.string().required(),
    name: Joi.string().required(),
  })).required(),
  subclasses: Joi.array().items(Joi.object({
    index: Joi.string().required(),
    name: Joi.string().required(),
  })),
});

module.exports = spellSchema;
