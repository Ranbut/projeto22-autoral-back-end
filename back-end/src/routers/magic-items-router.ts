import { Router } from 'express';
import { getMagicItem, getAllMagicItems, addMagicItem, editMagicItem, removeMagicItem } from '@/controllers';
import { authenticateToken, validateBody } from '@/middlewares';
import { createMagicItemSchema } from '@/schemas';

const magicItemsRouter = Router();

magicItemsRouter
    .all('/*', authenticateToken)
    .get('/', getAllMagicItems)
    .get('/:id', getMagicItem)
    .delete('/:id', removeMagicItem)
    .put('/:id', validateBody(createMagicItemSchema), editMagicItem)
    .post('/', validateBody(createMagicItemSchema), addMagicItem);

export { magicItemsRouter };
