import { Router } from 'express';
import { getAllEquipments, getEquipment, addEquipment, editEquipment, removeEquipment } from '@/controllers';
import { authenticateToken } from '@/middlewares';

const equipmentsRouter = Router();

equipmentsRouter
    .all('/*', authenticateToken)
    .get('/', getAllEquipments)
    .get('/:id', getEquipment)
    .delete('/:id', removeEquipment)
    .put('/:id', editEquipment)
    .post('/', addEquipment);

export { equipmentsRouter };
