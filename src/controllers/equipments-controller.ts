import { Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import equipmentsService from '@/services/equipments-service';
import { AuthenticatedRequest } from '@/middlewares';

export async function getEquipment(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const { userId } = req;
    const { id } = req.params;
    try {
        const equipment = await equipmentsService.getEquipment(userId, Number(id));

        return res.status(httpStatus.OK).send(equipment);
    } catch (error) {
        next(error);
    }
}

export async function getAllEquipments(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const { userId } = req;
    try {
        const equipments = await equipmentsService.getAllEquipments(userId);

        return res.status(httpStatus.OK).send(equipments);
    } catch (error) {
        next(error);
    }
}

export async function removeEquipment(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const { userId } = req;
    const { id } = req.params;
    try {
        await equipmentsService.removeEquipment(userId, Number(id));

        return res.sendStatus(httpStatus.OK);
    } catch (error) {
        next(error);
    }
}

export async function addEquipment(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const { userId } = req;
    const equipmentData = req.body;

    try {
        await equipmentsService.addEquipment(userId, equipmentData);
        return res.sendStatus(httpStatus.CREATED);
    } catch (error) {
        console.log(error);
        next(error);
    }
}