import { Prisma } from '@prisma/client';
import { prisma } from '@/config';

export async function getMagicItem(userId: number, id: number) {
    return await prisma.magicItem.findFirst({
        where: {
            id,
            userId
        },
    });
}

export async function getAllMagicItems(userId: number) {
    return await prisma.magicItem.findMany({
        where: {
            userId
        },
    });
}


export async function removeMagicItem(id: number) {
    await prisma.magicItem.delete({
        where: {
            id
        },
    });
}

async function addMagicItem(data: Prisma.MagicItemCreateInput) {
    return prisma.magicItem.create({
        data
    });
}

const magicItemsRepository = {
    getMagicItem,
    getAllMagicItems,
    removeMagicItem,
    addMagicItem
};

export default magicItemsRepository;
