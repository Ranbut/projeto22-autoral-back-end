import { Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import charactersService from '@/services/characters-service';
import { AuthenticatedRequest } from '@/middlewares';

export async function createCharacter(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const { userId } = req;
    const characterData = req.body;

    try {
        const character = await charactersService.createCharacter(userId, characterData);
        return res.status(httpStatus.CREATED).send(character);
    } catch (error) {
        console.log(error);
        next(error);
    }
}
