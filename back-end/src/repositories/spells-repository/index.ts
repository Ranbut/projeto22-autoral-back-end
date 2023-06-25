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

export async function editSpell(id: number, spellData: any) {
    await prisma.spell.update({
        where: { id },
        data: {
            spell: spellData,
            updatedAt: new Date()
          }
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
    editSpell,
    addSpell
};

export default spellsRepository;
