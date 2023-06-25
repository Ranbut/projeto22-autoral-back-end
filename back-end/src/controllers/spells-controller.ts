import { Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import spellsService from '@/services/spells-service';
import { AuthenticatedRequest } from '@/middlewares';

export async function getSpell(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const { userId } = req;
    const { id } = req.params;
    
    try {
        const spell = await spellsService.getSpell(userId, Number(id));

        return res.status(httpStatus.OK).send(spell);
    } catch (error) {
        next(error);
    }
}

export async function getAllSpells(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const { userId } = req;

    try {
        const spells = await spellsService.getAllSpells(userId);

        return res.status(httpStatus.OK).send(spells);
    } catch (error) {
        next(error);
    }
}

export async function editSpell(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const { userId } = req;
    const { id } = req.params;
    const spellData = req.body;

    try {
        const spell = await spellsService.editSpell(userId, Number(id), spellData);

        return res.status(httpStatus.OK).send(spell);
    } catch (error) {
        next(error);
    }
}

export async function removeSpell(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const { userId } = req;
    const { id } = req.params;

    try {
        await spellsService.removeSpell(userId, Number(id));

        return res.sendStatus(httpStatus.OK);
    } catch (error) {
        next(error);
    }
}

export async function addSpell(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const { userId } = req;
    const spellData = req.body;

    try {
        const spell = await spellsService.addSpell(userId, spellData);
        return res.status(httpStatus.CREATED).send(spell);
    } catch (error) {
        next(error);
    }
}