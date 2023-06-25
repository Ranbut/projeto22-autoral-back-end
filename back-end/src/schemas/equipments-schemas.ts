import Joi from 'joi';

export const createEquipmentSchema = Joi.object({
    index: Joi.string().required(),
    name: Joi.string().required(),
    cost: { quantity: Joi.number().required(), unit: Joi.string().required() },
    weight: Joi.number().required(),
    equipment_category: { name: Joi.string().required() },
    special: Joi.optional(),
    contents: Joi.optional(),
    properties: Joi.optional(),
    desc: Joi.optional(),
});
