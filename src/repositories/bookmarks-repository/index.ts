import { MonsterBookmark, Prisma } from '@prisma/client';
import { prisma } from '@/config';

export async function getMonstersBookmarks(userId: number) {
    return prisma.monsterBookmark.findMany({
        where: {
            userId
        },
      })
}

export async function getSpellsBookmarks(userId: number) {
    return prisma.spellBookmark.findMany({
        where: {
            userId
        },
      })
}

export async function getEquipmentsBookmarks(userId: number) {
    return prisma.equipmentBookmark.findMany({
        where: {
            userId
        },
      })
}

export async function getMagicItemsBookmarks(userId: number) {
   return prisma.magicItemBookmark.findMany({
        where: {
            userId
        },
      })
}

async function addMonsterBookmark(data: Prisma.MonsterBookmarkCreateInput): Promise<MonsterBookmark> {
    return prisma.monsterBookmark.create({
        data,
      });
}

async function addSpellBookmark(data: Prisma.SpellBookmarkCreateInput) {
    return prisma.spellBookmark.create({
        data,
      });
}

async function addEquipmentBookmark(data: Prisma.EquipmentBookmarkCreateInput) {
    return prisma.equipmentBookmark.create({
        data,
      });
}

async function addMagicItemBookmark(data: Prisma.MagicItemBookmarkCreateInput) {
    return prisma.magicItemBookmark.create({
        data,
      });
}

const bookmarksRepository = {
    getMonstersBookmarks,
    getSpellsBookmarks,
    getEquipmentsBookmarks,
    getMagicItemsBookmarks,
    addMonsterBookmark,
    addSpellBookmark,
    addEquipmentBookmark,
    addMagicItemBookmark
};

export default bookmarksRepository;
