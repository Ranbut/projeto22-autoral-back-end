import { Router } from 'express';
import { createCharacter } from '@/controllers';
import { authenticateToken, validateBody } from '@/middlewares';
import { characterSchema } from '@/schemas';

const charactersRouter = Router();

charactersRouter
    .all('/*', authenticateToken)
    .post('/', validateBody(characterSchema), createCharacter);

export { charactersRouter };
