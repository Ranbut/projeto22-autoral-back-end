import { Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import magicItemsService from '@/services/magic-items-service';
import { AuthenticatedRequest } from '@/middlewares';

export async function getMagicItem(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const { userId } = req;
    const { id } = req.params;
    try {
        const magicItem = await magicItemsService.getMagicItem(userId, Number(id));

        return res.status(httpStatus.OK).send(magicItem);
    } catch (error) {
        next(error);
    }
}

export async function getAllMagicItems(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const { userId } = req;
    try {
        const magicItems = await magicItemsService.getAllMagicItems(userId);

        return res.status(httpStatus.OK).send(magicItems);
    } catch (error) {
        next(error);
    }
}

export async function removeMagicItem(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const { userId } = req;
    const { id } = req.params;
    try {
        await magicItemsService.removeMagicItem(userId, Number(id));

        return res.sendStatus(httpStatus.OK);
    } catch (error) {
        next(error);
    }
}

export async function editMagicItem(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const { userId } = req;
    const { id } = req.params;
    const magicItemData = req.body;
    try {
        const magicItem = await magicItemsService.editMagicItem(userId, Number(id), magicItemData);

        return res.status(httpStatus.OK).send(magicItem);
    } catch (error) {
        next(error);
    }
}

export async function addMagicItem(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const { userId } = req;
    const magicItemData = req.body;

    try {
        const magicItem = await magicItemsService.addMagicItem(userId, magicItemData);
        return res.status(httpStatus.CREATED).send(magicItem);
    } catch (error) {
        next(error);
    }
}