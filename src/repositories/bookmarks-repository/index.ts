import { MonsterBookmark, Prisma } from '@prisma/client';
import { prisma } from '@/config';

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
    addMonsterBookmark,
    addSpellBookmark,
    addEquipmentBookmark,
    addMagicItemBookmark
};

export default bookmarksRepository;
