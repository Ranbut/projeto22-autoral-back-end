import { Router } from 'express';
import { getAllEquipments, getEquipment, addEquipment, editEquipment, removeEquipment } from '@/controllers';
import { authenticateToken, validateBody } from '@/middlewares';
import { createEquipmentSchema } from '@/schemas';

const equipmentsRouter = Router();

equipmentsRouter
    .all('/*', authenticateToken)
    .get('/', getAllEquipments)
    .get('/:id', getEquipment)
    .delete('/:id', removeEquipment)
    .put('/:id', validateBody(createEquipmentSchema), editEquipment)
    .post('/', validateBody(createEquipmentSchema), addEquipment);

export { equipmentsRouter };
