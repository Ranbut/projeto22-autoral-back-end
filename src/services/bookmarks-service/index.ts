import { Bookmark, CreateBookmarkParams } from '@/protocols';
import bookmarksRepository from '@/repositories/bookmarks-repository';

export async function getMonstersBookmarks(userId: number) {
    const bookmarks = await bookmarksRepository.getMonstersBookmarks(userId);
  
    return bookmarks;
}

export async function getSpellsBookmarks(userId: number) {
    const bookmarks = await bookmarksRepository.getSpellsBookmarks(userId);
  
    return bookmarks;
}

export async function getEquipmentsBookmarks(userId: number) {
    const bookmarks = await bookmarksRepository.getEquipmentsBookmarks(userId);
  
    return bookmarks;
}

export async function getMagicItemsBookmarks(userId: number) {
    const bookmarks = await bookmarksRepository.getMagicItemsBookmarks(userId);
  
    return bookmarks;
}


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
    getMonstersBookmarks,
    getSpellsBookmarks,
    getEquipmentsBookmarks,
    getMagicItemsBookmarks,
    addMonsterBookmark,
    addSpellBookmark,
    addEquipmentBookmark,
    addMagicItemBookmark
};

export default bookmarksService;
