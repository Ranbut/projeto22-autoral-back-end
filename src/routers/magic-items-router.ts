import { Router } from 'express';
import { getMagicItem, getAllMagicItems, addMagicItem, editMagicItem, removeMagicItem } from '@/controllers';
import { authenticateToken } from '@/middlewares';

const magicItemsRouter = Router();

magicItemsRouter
    .all('/*', authenticateToken)
    .get('/', getAllMagicItems)
    .get('/:id', getMagicItem)
    .delete('/:id', removeMagicItem)
    .put('/:id', editMagicItem)
    .post('/', addMagicItem);

export { magicItemsRouter };
