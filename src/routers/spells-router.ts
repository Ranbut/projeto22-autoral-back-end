import { Router } from 'express';
import { getSpell, getAllSpells, addSpell, editSpell, removeSpell } from '@/controllers';
import { authenticateToken } from '@/middlewares';

const spellsRouter = Router();

spellsRouter
    .all('/*', authenticateToken)
    .get('/', getAllSpells)
    .get('/:id', getSpell)
    .delete('/:id', removeSpell)
    .put('/:id', editSpell)
    .post('/', addSpell);

export { spellsRouter };
