import { Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import bookmarksService from '@/services/bookmarks-service';
import { AuthenticatedRequest } from '@/middlewares';

export async function addMonsterBookmark(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const { userId } = req;
    const bookmarkData = req.body;

    try {
        await bookmarksService.addMonsterBookmark(userId, bookmarkData);
        return res.sendStatus(httpStatus.CREATED);
    } catch (error) {
        next(error);
    }
}

export async function addSpellBookmark(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const { userId } = req;
    const bookmarkData = req.body;

    try {
        await bookmarksService.addSpellBookmark(userId, bookmarkData);
        return res.sendStatus(httpStatus.CREATED);
    } catch (error) {
        next(error);
    }
}

export async function addEquipmentBookmark(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const { userId } = req;
    const bookmarkData = req.body;

    try {
        await bookmarksService.addEquipmentBookmark(userId, bookmarkData);
        return res.sendStatus(httpStatus.CREATED);
    } catch (error) {
        next(error);
    }
}

export async function addMagicItemBookmark(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const { userId } = req;
    const bookmarkData = req.body;

    try {
        await bookmarksService.addMagicItemBookmark(userId, bookmarkData);
        return res.sendStatus(httpStatus.CREATED);
    } catch (error) {
        next(error);
    }
}