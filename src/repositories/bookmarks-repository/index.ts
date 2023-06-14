import { MonsterBookmark, Prisma } from '@prisma/client';
import { prisma } from '@/config';

export async function getBookmark(userId: number, index: string) {
    const monster = await prisma.monsterBookmark.findFirst({
        where: {
            index,
            userId
        },
    });
    if (monster) return monster;

    const spell = await prisma.spellBookmark.findFirst({
        where: {
            index,
            userId
        },
    });
    if (spell) return spell;

    const equipment = await prisma.equipmentBookmark.findFirst({
        where: {
            index,
            userId
        },
    });
    if (equipment) return equipment;

    const magicItem = await prisma.magicItemBookmark.findFirst({
        where: {
            index,
            userId
        },
    });
    if (magicItem) return magicItem;

    return null;
}

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
    getBookmark,
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
