import Joi from 'joi';

export const createEquipmentSchema = Joi.object({
    equipment: Joi.object().required()
});
