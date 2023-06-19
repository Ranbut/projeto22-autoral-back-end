import { Router } from 'express';
import { getSpell, getAllSpells, addSpell, removeSpell } from '@/controllers';
import { authenticateToken } from '@/middlewares';

const spellsRouter = Router();

spellsRouter
    .all('/*', authenticateToken)
    .get('/', getAllSpells)
    .get('/:id', getSpell)
    .delete('/:id', removeSpell)
    .post('/', addSpell);

export { spellsRouter };
