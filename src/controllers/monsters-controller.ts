import { Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import monstersService from '@/services/monsters-service';
import { AuthenticatedRequest } from '@/middlewares';

export async function getMonster(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const { userId } = req;
    const { id } = req.params;
    try {
        const monster = await monstersService.getMonster(userId, Number(id));

        return res.status(httpStatus.OK).send(monster);
    } catch (error) {
        next(error);
    }
}

export async function getAllMonsters(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const { userId } = req;
    try {
        const monsters = await monstersService.getAllMonsters(userId);

        return res.status(httpStatus.OK).send(monsters);
    } catch (error) {
        next(error);
    }
}

export async function removeMonsters(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const { userId } = req;
    const { id } = req.params;
    try {
        await monstersService.removeMonster(userId, Number(id));

        return res.sendStatus(httpStatus.OK);
    } catch (error) {
        next(error);
    }
}

export async function addMonster(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const { userId } = req;
    const monsterData = req.body;

    try {
        await monstersService.addMonster(userId, monsterData);
        return res.sendStatus(httpStatus.CREATED);
    } catch (error) {
        console.log(error);
        next(error);
    }
}