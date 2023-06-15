import { Prisma, TypeBookmark } from '@prisma/client';
import { prisma } from '@/config';

export async function getBookmark(userId: number, index: string) {
    return await prisma.bookmark.findFirst({
        where: {
            index,
            userId
        },
    });
}

export async function removeBookmark(id: number) {
    await prisma.bookmark.delete({
        where: {
            id
        },
    });
}

export async function getBookmarks(userId: number, type: TypeBookmark) {
    return prisma.bookmark.findMany({
        where: {
            userId,
            type
        },
      })
}

async function addBookmark(data: Prisma.BookmarkCreateInput) {
    return prisma.bookmark.create({
        data,
      });
}

const bookmarksRepository = {
    getBookmark,
    removeBookmark,
    getBookmarks,
    addBookmark,
};

export default bookmarksRepository;
