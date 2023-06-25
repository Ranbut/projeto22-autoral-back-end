import faker from '@faker-js/faker';
import { History, TypeInfo } from '@prisma/client';
import { prisma } from '@/config';


export async function createHistory(userId: number, name?: string, type?: TypeInfo): Promise<History> {
  const bookmarkName = faker.name.firstName();
  const index = name ? name.toLowerCase() : bookmarkName.toLowerCase();
  const bookmarkType = type || "MONSTER";

  return prisma.history.create({
    data: {
      userId,
      index,
      name: name || bookmarkName,
      type: bookmarkType
    },
  });
}
