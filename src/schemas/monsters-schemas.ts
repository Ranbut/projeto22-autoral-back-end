import Joi from 'joi';

export const createMonsterSchema = Joi.object({
    monster: Joi.object().required()
});
