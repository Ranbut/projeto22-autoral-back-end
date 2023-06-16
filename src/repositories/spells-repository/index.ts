import { Prisma } from '@prisma/client';
import { prisma } from '@/config';

export async function getSpell(userId: number, id: number) {
    return await prisma.spell.findFirst({
        where: {
            id,
            userId
        },
    });
}

export async function getAllSpells(userId: number) {
    return await prisma.spell.findMany({
        where: {
            userId
        },
    });
}


export async function removeSpell(id: number) {
    await prisma.spell.delete({
        where: {
            id
        },
    });
}

async function addSpell(data: Prisma.SpellCreateInput) {
    return prisma.spell.create({
        data
    });
}

const spellsRepository = {
    getSpell,
    getAllSpells,
    removeSpell,
    addSpell
};

export default spellsRepository;
