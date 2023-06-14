import { Bookmark, CreateBookmarkParams } from '@/protocols';
import bookmarksRepository from '@/repositories/bookmarks-repository';
import { MonsterBookmark } from '@prisma/client';

async function addMonsterBookmark(userId: number, bookmark: Bookmark) {
    const bookmarkData: CreateBookmarkParams = {
        userId,
        ...bookmark,
      };

    const createdBookmark = await bookmarksRepository.addMonsterBookmark(bookmarkData);
  
    return createdBookmark;
}

async function addSpellBookmark(userId: number, bookmark: Bookmark) {
    const bookmarkData: CreateBookmarkParams = {
        userId,
        ...bookmark,
      };

    const createdBookmark = await bookmarksRepository.addSpellBookmark(bookmarkData);
  
    return createdBookmark;
}

async function addEquipmentBookmark(userId: number, bookmark: Bookmark) {
    const bookmarkData: CreateBookmarkParams = {
        userId,
        ...bookmark,
      };

    const createdBookmark = await bookmarksRepository.addEquipmentBookmark(bookmarkData);
  
    return createdBookmark;
}

async function addMagicItemBookmark(userId: number, bookmark: Bookmark) {
    const bookmarkData: CreateBookmarkParams = {
        userId,
        ...bookmark,
      };

    const createdBookmark = await bookmarksRepository.addMagicItemBookmark(bookmarkData);
  
    return createdBookmark;
}

const bookmarksService = { 
    addMonsterBookmark,
    addSpellBookmark,
    addEquipmentBookmark,
    addMagicItemBookmark
};

export default bookmarksService;
