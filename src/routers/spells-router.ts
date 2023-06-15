import { Router } from 'express';
import { getSpell, addSpell, removeSpell } from '@/controllers';
import { authenticateToken, validateBody } from '@/middlewares';
import { spellSchema } from '@/schemas';

const spellsRouter = Router();

spellsRouter
    .all('/*', authenticateToken)
    .get('/:id', getSpell)
    .delete('/:id', removeSpell)
    .post('/', validateBody(spellSchema), addSpell)

export { spellsRouter };
