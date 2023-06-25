import faker from '@faker-js/faker';
import { Equipment } from '@prisma/client';
import { prisma } from '@/config';


export async function createEquipment(userId: number): Promise<Equipment> {
    return prisma.equipment.create({
      data: {
        userId,
        equipment: { 
            name: faker.name.firstName()       
        }
      },
    });
  }