import { notFoundError } from '@/errors';
import { CreateEquipmentParams } from '@/protocols';
import equipmentsRepository from '@/repositories/equipments-repository';

export async function getEquipment(userId: number, equipmentId: number) {
  const equipment = await equipmentsRepository.getEquipment(userId, equipmentId);
  if (!equipment) throw notFoundError();

  return equipment;
}

export async function getAllEquipments(userId: number) {
  const equipments = await equipmentsRepository.getAllEquipments(userId);

  return equipments;
}

async function removeEquipment(userId: number, equipmentId: number) {
  await getEquipment(userId, equipmentId);

  await equipmentsRepository.removeEquipment(equipmentId);
}

async function editEquipment(userId: number, equipmentId: number, equipmentBody: any) {
  await getEquipment(userId, equipmentId);

  const equipment = await equipmentsRepository.editEquipment(equipmentId, equipmentBody);

  return equipment;
}

async function addEquipment(userId: number, equipmentsBody: any) {
  const equipmentData: CreateEquipmentParams = {
    userId,
    equipment: equipmentsBody,
  };

  const equipment = await equipmentsRepository.addEquipment(equipmentData);

  return equipment;
}

const equipmentsService = { 
  getEquipment,
  getAllEquipments,
  removeEquipment,
  editEquipment,
  addEquipment 
};

export default equipmentsService;
