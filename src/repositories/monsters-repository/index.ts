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

async function addMonster(data: Prisma.MonsterCreateInput) {
    return prisma.monster.create({
        data
    });
}

const monstersRepository = {
    getMonster,
    getAllMonsters,
    removeMonster,
    addMonster
};

export default monstersRepository;
