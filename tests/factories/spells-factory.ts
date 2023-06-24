import faker from '@faker-js/faker';
import { Spell } from '@prisma/client';
import { prisma } from '@/config';


export async function createSpell(userId: number): Promise<Spell> {
    return prisma.spell.create({
      data: {
        userId,
        spell: { 
            name: faker.name.firstName()       
        }
      },
    });
  }