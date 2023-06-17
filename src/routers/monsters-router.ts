import { Router } from 'express';
import { getMonster, getAllMonsters, addMonster, removeMonsters } from '@/controllers';
import { authenticateToken } from '@/middlewares';

const monstersRouter = Router();

monstersRouter
    .all('/*', authenticateToken)
    .get('/', getAllMonsters)
    .get('/:id', getMonster)
    .delete('/:id', removeMonsters)
    .post('/', addMonster)

export { monstersRouter };
