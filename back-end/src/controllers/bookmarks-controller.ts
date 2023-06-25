import { Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import bookmarksService from '@/services/bookmarks-service';
import { AuthenticatedRequest } from '@/middlewares';

export async function getBookmark(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const { userId } = req;
    const { index } = req.params;
    try {
        const bookmark = await bookmarksService.getBookmark(userId, index);
        return res.status(httpStatus.OK).send(bookmark);
    } catch (error) {
        next(error);
    }
}

export async function removeBookmark(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const { userId } = req;
    const { index } = req.params;
    try {
        await bookmarksService.removeBookmark(userId, index);
        return res.sendStatus(httpStatus.OK);
    } catch (error) {
        next(error);
    }
}

export async function getAllBookmarks(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const { userId } = req;

    try {
        const bookmarks = await bookmarksService.getAllBookmarks(userId);
        return res.status(httpStatus.OK).send(bookmarks);
    } catch (error) {
        next(error);
    }
}

export async function addBookmark(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const { userId } = req;
    const bookmarkData = req.body;

    try {
        await bookmarksService.addBookmark(userId, bookmarkData);
        return res.sendStatus(httpStatus.CREATED);
    } catch (error) {
        next(error);
    }
}