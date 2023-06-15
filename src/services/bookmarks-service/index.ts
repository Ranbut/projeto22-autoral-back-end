import { notFoundError } from '@/errors/not-found-error';
import { BookmarkType, CreateBookmarkParams } from '@/protocols';
import bookmarksRepository from '@/repositories/bookmarks-repository';
import { TypeBookmark } from '@prisma/client';

export async function getBookmark(userId: number, index: string) {
    const bookmark = await bookmarksRepository.getBookmark(userId, index);

    return bookmark;
}

export async function removeBookmark(userId: number, index: string) {
    const bookmark = await bookmarksRepository.getBookmark(userId, index);
    if (!bookmark) throw notFoundError();

    await bookmarksRepository.removeBookmark(bookmark.id);
}

export async function getBookmarks(userId: number, type: TypeBookmark) {
    const bookmarks = await bookmarksRepository.getBookmarks(userId, type);
  
    return bookmarks;
}

async function addBookmark(userId: number, type: string, bookmark: BookmarkType) {
    const bookmarkData: CreateBookmarkParams = {
        userId,
        type,
        ...bookmark,
      };

    const createdBookmark = await bookmarksRepository.addBookmark(bookmarkData);
  
    return createdBookmark;
}

const bookmarksService = { 
    getBookmark,
    removeBookmark,
    getBookmarks,
    addBookmark,
};

export default bookmarksService;
