import { Router } from 'express';
import { getMonster, getAllMonsters, addMonster, editMonster, removeMonster } from '@/controllers';
import { authenticateToken, validateBody } from '@/middlewares';
import { createMonsterSchema } from '@/schemas';

const monstersRouter = Router();

monstersRouter
    .all('/*', authenticateToken)
    .get('/', getAllMonsters)
    .get('/:id', getMonster)
    .delete('/:id', removeMonster)
    .put('/:id', validateBody(createMonsterSchema), editMonster)
    .post('/', validateBody(createMonsterSchema), addMonster);

export { monstersRouter };
