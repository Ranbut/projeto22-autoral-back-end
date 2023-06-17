import { notFoundError, cannotBookmarkError } from '@/errors';
import { BookmarkType, CreateBookmarkParams } from '@/protocols';
import bookmarksRepository from '@/repositories/bookmarks-repository';

export async function getBookmark(userId: number, index: string) {
    const bookmark = await bookmarksRepository.getBookmark(userId, index);

    return bookmark;
}

export async function removeBookmark(userId: number, index: string) {
    const bookmark = await bookmarksRepository.getBookmark(userId, index);
    if (!bookmark) throw notFoundError();

    await bookmarksRepository.removeBookmark(bookmark.id);
}

export async function getAllBookmarks(userId: number) {
    const bookmarks = await bookmarksRepository.getAllBookmarks(userId);
  
    return bookmarks;
}

async function addBookmark(userId: number, bookmark: BookmarkType) {
    const bookmarkExist = await bookmarksRepository.getBookmark(userId, bookmark.index);
    if (bookmarkExist) throw cannotBookmarkError();

    const bookmarkData: CreateBookmarkParams = {
        userId,
        ...bookmark,
      };

    const createdBookmark = await bookmarksRepository.addBookmark(bookmarkData);
  
    return createdBookmark;
}

const bookmarksService = { 
    getBookmark,
    removeBookmark,
    getAllBookmarks,
    addBookmark,
};

export default bookmarksService;
