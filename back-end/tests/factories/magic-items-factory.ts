import faker from '@faker-js/faker';
import { MagicItem } from '@prisma/client';
import { prisma } from '@/config';


export async function createMagicItems(userId: number): Promise<MagicItem> {
    return prisma.magicItem.create({
      data: {
        userId,
        magicItem: { 
            name: faker.name.firstName()       
        }
      },
    });
  }