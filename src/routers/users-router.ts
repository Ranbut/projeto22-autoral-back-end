import { Router } from 'express';

import { avatarSchema, createUserSchema } from '@/schemas';
import { authenticateToken, validateBody } from '@/middlewares';
import { updateAvatar, usersPost } from '@/controllers';

const usersRouter = Router();

usersRouter
    .post('/', validateBody(createUserSchema), usersPost)
    .all('/*', authenticateToken)
    .put('/avatar', validateBody(avatarSchema), updateAvatar);

export { usersRouter };
