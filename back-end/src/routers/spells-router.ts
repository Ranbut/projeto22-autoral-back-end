import { Router } from 'express';
import { getSpell, getAllSpells, addSpell, editSpell, removeSpell } from '@/controllers';
import { authenticateToken, validateBody } from '@/middlewares';
import { createSpellSchema } from '@/schemas';

const spellsRouter = Router();

spellsRouter
    .all('/*', authenticateToken)
    .get('/', getAllSpells)
    .get('/:id', getSpell)
    .delete('/:id', removeSpell)
    .put('/:id', validateBody(createSpellSchema), editSpell)
    .post('/', validateBody(createSpellSchema), addSpell);

export { spellsRouter };
