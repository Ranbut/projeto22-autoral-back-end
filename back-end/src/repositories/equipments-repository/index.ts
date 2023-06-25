import { Prisma } from '@prisma/client';
import { prisma } from '@/config';

export async function getEquipment(userId: number, id: number) {
    return await prisma.equipment.findFirst({
        where: {
            id,
            userId
        },
    });
}

export async function getAllEquipments(userId: number) {
    return await prisma.equipment.findMany({
        where: {
            userId
        },
    });
}

export async function removeEquipment(id: number) {
    await prisma.equipment.delete({
        where: {
            id
        },
    });
}

export async function editEquipment(id: number, equipmentData: any) {
    await prisma.equipment.update({
        where: { id },
        data: {
            equipment: equipmentData,
            updatedAt: new Date()
          }
    });
}

async function addEquipment(data: Prisma.EquipmentCreateInput) {
    return prisma.equipment.create({
        data
    });
}

const equipmentsRepository = {
    getEquipment,
    getAllEquipments,
    removeEquipment,
    editEquipment,
    addEquipment
};

export default equipmentsRepository;
