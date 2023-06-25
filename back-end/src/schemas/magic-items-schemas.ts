import Joi from 'joi';

export const createMagicItemSchema = Joi.object({
    index: Joi.string().required(),
    name: Joi.string().required(),
    equipment_category: { name: Joi.string().required() },
    rarity: { name: Joi.string().required() },
    variant: Joi.boolean().required(),
    desc: Joi.required(),
    variants: Joi.optional(),
});
