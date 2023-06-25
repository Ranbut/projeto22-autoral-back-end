import faker from '@faker-js/faker';
import { Bookmark, TypeInfo } from '@prisma/client';
import { prisma } from '@/config';


export async function createBookmark(userId: number, name?: string, type?: TypeInfo): Promise<Bookmark> {
  const bookmarkName = faker.name.firstName();
  const index = name ? name.toLowerCase() : bookmarkName.toLowerCase();
  const bookmarkType = type || "MONSTER";

  return prisma.bookmark.create({
    data: {
      userId,
      index,
      name: name || bookmarkName,
      type: bookmarkType
    },
  });
}
