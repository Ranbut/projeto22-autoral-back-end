import { Response, NextFunction } from 'express';
import httpStatus from 'http-status';
//import spellsService from '@/services/spells-service';
import { AuthenticatedRequest } from '@/middlewares';

export async function getSpell(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const { userId } = req;
    //const { id } = req.params;
    try {
        return res.status(httpStatus.OK).send();
    } catch (error) {
        next(error);
    }
}

export async function removeSpell(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const { userId } = req;
    try {
        return res.sendStatus(httpStatus.OK);
    } catch (error) {
        next(error);
    }
}

export async function addSpell(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const { userId } = req;
    const spellData = req.body;

    try {
        //await spellsService.addSpell(userId, spellData);
        return res.sendStatus(httpStatus.CREATED);
    } catch (error) {
        console.log(error);
        next(error);
    }
}