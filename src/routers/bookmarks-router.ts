import { Router } from 'express';
import { addMonsterBookmark, addSpellBookmark, addEquipmentBookmark, addMagicItemBookmark } from '@/controllers';
import { authenticateToken, validateBody } from '@/middlewares';
import { bookmarkSchema } from '@/schemas';

const bookmarksRouter = Router();

bookmarksRouter
    .all('/*', authenticateToken)
    .post('/monsters', validateBody(bookmarkSchema), addMonsterBookmark)
    .post('/spells', validateBody(bookmarkSchema), addSpellBookmark)
    .post('/equipments', validateBody(bookmarkSchema), addEquipmentBookmark)
    .post('/magic-items', validateBody(bookmarkSchema), addMagicItemBookmark);

export { bookmarksRouter };
