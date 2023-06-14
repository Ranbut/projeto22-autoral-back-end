import { Router } from 'express';
import { getBookmark,
    getMonstersBookmarks, getSpellsBookmarks, getEquipmentsBookmarks, getMagicItemsBookmarks,
    addMonsterBookmark, addSpellBookmark, addEquipmentBookmark, addMagicItemBookmark 
} from '@/controllers';
import { authenticateToken, validateBody } from '@/middlewares';
import { bookmarkSchema } from '@/schemas';

const bookmarksRouter = Router();

bookmarksRouter
    .all('/*', authenticateToken)
    .get('/user/:index', getBookmark)
    .get('/monsters', getMonstersBookmarks)
    .get('/spells', getSpellsBookmarks)
    .get('/equipments', getEquipmentsBookmarks)
    .get('/magic-items', getMagicItemsBookmarks)
    .post('/monsters', validateBody(bookmarkSchema), addMonsterBookmark)
    .post('/spells', validateBody(bookmarkSchema), addSpellBookmark)
    .post('/equipments', validateBody(bookmarkSchema), addEquipmentBookmark)
    .post('/magic-items', validateBody(bookmarkSchema), addMagicItemBookmark);

export { bookmarksRouter };
