import Joi from 'joi';

export const createMagicItemSchema = Joi.object({
    magicItem: Joi.object().required()
});
