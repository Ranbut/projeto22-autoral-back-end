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

export async function editEquipment(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const { userId } = req;
    const { id } = req.params;
    const equipmentData = req.body;

    try {
        const equipment = await equipmentsService.editEquipment(userId, Number(id), equipmentData);

        return res.sendStatus(httpStatus.OK).send(equipment);
    } catch (error) {
        next(error);
    }
}

export async function addEquipment(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const { userId } = req;
    const equipmentData = req.body;

    try {
        const equipment = await equipmentsService.addEquipment(userId, equipmentData);
        return res.status(httpStatus.CREATED).send(equipment);
    } catch (error) {
        console.log(error);
        next(error);
    }
}