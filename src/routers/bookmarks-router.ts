import { Router } from 'express';
import { getBookmark, removeBookmark, addBookmark, getAllBookmarks
} from '@/controllers';
import { authenticateToken, validateBody } from '@/middlewares';
import { bookmarkSchema } from '@/schemas';

const bookmarksRouter = Router();

bookmarksRouter
    .all('/*', authenticateToken)
    .get('/:index', getBookmark)
    .delete('/:index', removeBookmark)
    .get('/', getAllBookmarks)
    .post('/', validateBody(bookmarkSchema), addBookmark);

export { bookmarksRouter };
