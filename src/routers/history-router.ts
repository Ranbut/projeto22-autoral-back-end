import { Router } from 'express';
import { getAllHistory, deleteAllHistory, addHistory } from '@/controllers';
import { authenticateToken, validateBody } from '@/middlewares';
import { historySchema } from '@/schemas/';

const historyRouter = Router();

historyRouter
    .all('/*', authenticateToken)
    .get('/', getAllHistory)
    .delete('/', deleteAllHistory)
    .post('/', validateBody(historySchema), addHistory)

export { historyRouter };
