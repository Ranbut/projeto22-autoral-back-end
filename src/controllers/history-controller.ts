import { Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import historyService from '@/services/history-service';
import { AuthenticatedRequest } from '@/middlewares';

export async function getAllHistory(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const { userId } = req;
    try {
        const bookmark = await historyService.getAllHistory(userId);
        return res.status(httpStatus.OK).send(bookmark);
    } catch (error) {
        next(error);
    }
}

export async function deleteAllHistory(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const { userId } = req;

    try {
        await historyService.deleteAllHistory(userId);
        return res.sendStatus(httpStatus.OK);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

export async function addHistory(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const { userId } = req;
    const { name, index, type } = req.body;
    
    try {
        const history = await historyService.addHistory(userId, index, name, type);
        return res.status(httpStatus.OK).send(history);
    } catch (error) {
        next(error);
    }
}