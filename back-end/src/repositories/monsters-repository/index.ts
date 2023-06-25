import { Prisma } from '@prisma/client';
import { prisma } from '@/config';

export async function getMonster(userId: number, id: number) {
    return await prisma.monster.findFirst({
        where: {
            id,
            userId
        },
    });
}

export async function getAllMonsters(userId: number) {
    return await prisma.monster.findMany({
        where: {
            userId
        },
    });
}


export async function removeMonster(id: number) {
    await prisma.monster.delete({
        where: {
            id
        },
    });
}

export async function editMonster(id: number, monsterData: any) {
    await prisma.monster.update({
      where: { id },
      data: {
        monster: monsterData,
        updatedAt: new Date()
      }
    });
  }

async function addMonster(data: Prisma.MonsterCreateInput) {
    return await prisma.monster.create({
        data
    });
}

const monstersRepository = {
    getMonster,
    getAllMonsters,
    removeMonster,
    editMonster,
    addMonster
};

export default monstersRepository;
