import faker from '@faker-js/faker';
import { Monster } from '@prisma/client';
import { prisma } from '@/config';


export async function createMonster(userId: number): Promise<Monster> {
    return prisma.monster.create({
      data: {
        userId,
        monster: { 
            name: faker.name.firstName()       
        }
      },
    });
  }