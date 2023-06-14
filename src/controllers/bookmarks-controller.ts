import { Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import bookmarksService from '@/services/bookmarks-service';
import { AuthenticatedRequest } from '@/middlewares';
import { TypeBookmark } from '@prisma/client';

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
        console.log(error);
        next(error);
    }
}

export async function getBookmarks(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const { userId } = req;
    const { type } = req.params;

    try {
        const bookmarkType = type.toUpperCase() as TypeBookmark;
        const bookmark = await bookmarksService.getBookmarks(userId, bookmarkType);
        return res.status(httpStatus.OK).send(bookmark);
    } catch (error) {
        next(error);
    }
}

export async function addBookmark(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const { userId } = req;
    const { type } = req.params;
    const bookmarkData = req.body;

    try {
        await bookmarksService.addBookmark(userId, type, bookmarkData);
        return res.sendStatus(httpStatus.CREATED);
    } catch (error) {
        console.log(error);
        next(error);
    }
}