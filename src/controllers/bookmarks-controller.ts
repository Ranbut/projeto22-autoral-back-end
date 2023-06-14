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

export async function getMonstersBookmarks(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const { userId } = req;

    try {
        const bookmark = await bookmarksService.getMonstersBookmarks(userId);
        return res.status(httpStatus.OK).send(bookmark);
    } catch (error) {
        next(error);
    }
}

export async function getSpellsBookmarks(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const { userId } = req;

    try {
        const bookmark = await bookmarksService.getSpellsBookmarks(userId);
        return res.status(httpStatus.OK).send(bookmark);
    } catch (error) {
        next(error);
    }
}

export async function getEquipmentsBookmarks(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const { userId } = req;

    try {
        const bookmark = await bookmarksService.getEquipmentsBookmarks(userId);
        return res.status(httpStatus.OK).send(bookmark);
    } catch (error) {
        next(error);
    }
}

export async function getMagicItemsBookmarks(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const { userId } = req;

    try {
        const bookmark = await bookmarksService.getMagicItemsBookmarks(userId);
        return res.status(httpStatus.OK).send(bookmark);
    } catch (error) {
        next(error);
    }
}

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