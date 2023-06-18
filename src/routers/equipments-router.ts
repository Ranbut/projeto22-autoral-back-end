import { Router } from 'express';
import { getAllEquipments, getEquipment, addEquipment, removeEquipment } from '@/controllers';
import { authenticateToken } from '@/middlewares';

const equipmentsRouter = Router();

equipmentsRouter
    .all('/*', authenticateToken)
    .get('/', getAllEquipments)
    .get('/:id', getEquipment)
    .delete('/:id', removeEquipment)
    .post('/', addEquipment)

export { equipmentsRouter };
