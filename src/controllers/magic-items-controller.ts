import { Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import magicItemsService from '@/services/magic-items-service';
import { AuthenticatedRequest } from '@/middlewares';

export async function getMagicItem(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const { userId } = req;
    const { id } = req.params;
    try {
        const spell = await magicItemsService.getMagicItem(userId, Number(id));

        return res.status(httpStatus.OK).send(spell);
    } catch (error) {
        next(error);
    }
}

export async function getAllMagicItems(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const { userId } = req;
    try {
        const spells = await magicItemsService.getAllMagicItems(userId);

        return res.status(httpStatus.OK).send(spells);
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

export async function addMagicItem(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const { userId } = req;
    const spellData = req.body;

    try {
        await magicItemsService.addMagicItem(userId, spellData);
        return res.sendStatus(httpStatus.CREATED);
    } catch (error) {
        console.log(error);
        next(error);
    }
}