import { Prisma } from '@prisma/client';
import { prisma } from '@/config';

export async function getHistory(index: string) {
    return await prisma.history.findFirst({
        where: {
            index
        },
    });
}

export async function deleteHistory(id: number) {
    await prisma.history.delete({
        where: {
            id
        },
    });
}

export async function deleteAllHistory(userId: number) {
    await prisma.history.deleteMany({
        where: {
            userId
        },
    });
}

export async function getAllHistory(userId: number) {
    return prisma.history.findMany({
        where: {
            userId
        },
        orderBy: { id: 'desc' },
      })
}

async function addHistory(data: Prisma.HistoryCreateInput) {
    return prisma.history.create({
        data,
      });
}

const historyRepository = {
    getHistory,
    deleteHistory,
    getAllHistory,
    deleteAllHistory,
    addHistory,
};

export default historyRepository;
