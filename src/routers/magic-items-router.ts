import { Router } from 'express';
import { getMagicItem, getAllMagicItems, addMagicItem, removeMagicItem } from '@/controllers';
import { authenticateToken } from '@/middlewares';

const magicItemsRouter = Router();

magicItemsRouter
    .all('/*', authenticateToken)
    .get('/', getAllMagicItems)
    .get('/:id', getMagicItem)
    .delete('/:id', removeMagicItem)
    .post('/', addMagicItem);

export { magicItemsRouter };
