import Joi from 'joi';

export const createUserSchema = Joi.object({
  username: Joi.string().max(255).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const avatarSchema = Joi.object({
  avatar: Joi.string().required(),
});