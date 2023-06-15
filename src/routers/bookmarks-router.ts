import { Router } from 'express';
import { getBookmark, removeBookmark, addBookmark, getBookmarks
} from '@/controllers';
import { authenticateToken, validateBody } from '@/middlewares';
import { bookmarkSchema } from '@/schemas';

const bookmarksRouter = Router();

bookmarksRouter
    .all('/*', authenticateToken)
    .get('/user/:index', getBookmark)
    .delete('/user/:index', removeBookmark)
    .get('/:type', getBookmarks)
    .post('/', validateBody(bookmarkSchema), addBookmark)

export { bookmarksRouter };
