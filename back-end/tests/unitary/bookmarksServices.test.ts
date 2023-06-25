import { notFoundError, cannotBookmarkError } from '@/errors';
import bookmarksService from '@/services/bookmarks-service';
import bookmarksRepository from '@/repositories/bookmarks-repository';
import { BookmarkType } from '@/protocols';

jest.mock('@/repositories/bookmarks-repository');

describe('Bookmarks Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getBookmark', () => {
    it('should return the bookmark if found', async () => {
      const userId = 1;
      const index = 'bookmark1';
      const mockBookmark = { id: 1, userId, index, name: 'Bookmark 1' };
      (bookmarksRepository.getBookmark as jest.Mock).mockResolvedValue(mockBookmark);

      const result = await bookmarksService.getBookmark(userId, index);

      expect(bookmarksRepository.getBookmark).toHaveBeenCalledWith(userId, index);
      expect(result).toEqual(mockBookmark);
    });

    it('should return null if the bookmark is not found', async () => {
      const userId = 1;
      const index = 'nonexistent';
      (bookmarksRepository.getBookmark as jest.Mock).mockResolvedValue(null);

      const result = await bookmarksService.getBookmark(userId, index);

      expect(bookmarksRepository.getBookmark).toHaveBeenCalledWith(userId, index);
      expect(result).toBeNull();
    });
  });

  describe('removeBookmark', () => {
    it('should remove the bookmark if it exists', async () => {
      const userId = 1;
      const index = 'bookmark1';
      const mockBookmark = { id: 1, userId, index, name: 'Bookmark 1' };
      (bookmarksRepository.getBookmark as jest.Mock).mockResolvedValue(mockBookmark);

      await bookmarksService.removeBookmark(userId, index);

      expect(bookmarksRepository.getBookmark).toHaveBeenCalledWith(userId, index);
      expect(bookmarksRepository.removeBookmark).toHaveBeenCalledWith(mockBookmark.id);
    });

    it('should throw a not found error if the bookmark is not found', async () => {
      const userId = 1;
      const index = 'nonexistent';
      (bookmarksRepository.getBookmark as jest.Mock).mockResolvedValue(null);

      await expect(bookmarksService.removeBookmark(userId, index)).rejects.toMatchObject({
        message: 'No result for this search!',
      });
      expect(bookmarksRepository.getBookmark).toHaveBeenCalledWith(userId, index);
      expect(bookmarksRepository.removeBookmark).not.toHaveBeenCalled();
    });
  });

  describe('getAllBookmarks', () => {
    it('should return all bookmarks for a user', async () => {
      const userId = 1;
      const mockBookmarks = [
        { id: 1, userId, index: 'bookmark1', name: 'Bookmark 1' },
        { id: 2, userId, index: 'bookmark2', name: 'Bookmark 2' },
      ];
      (bookmarksRepository.getAllBookmarks as jest.Mock).mockResolvedValue(mockBookmarks);

      const result = await bookmarksService.getAllBookmarks(userId);

      expect(bookmarksRepository.getAllBookmarks).toHaveBeenCalledWith(userId);
      expect(result).toEqual(mockBookmarks);
    });
  });

  describe('addBookmark', () => {
    it('should add a new bookmark if it does not exist', async () => {
      const userId = 1;
      const bookmark: BookmarkType = {
        id: 1,
        index: 'existingBookmark',
        name: 'Existing Bookmark',
        type: "MONSTER",
      };
      const mockCreateBookmarkParams = { userId, ...bookmark };
      const mockCreatedBookmark = { id: 1, userId, ...bookmark };
      (bookmarksRepository.getBookmark as jest.Mock).mockResolvedValue(null);
      (bookmarksRepository.addBookmark as jest.Mock).mockResolvedValue(mockCreatedBookmark);

      const result = await bookmarksService.addBookmark(userId, bookmark);

      expect(bookmarksRepository.getBookmark).toHaveBeenCalledWith(userId, bookmark.index);
      expect(bookmarksRepository.addBookmark).toHaveBeenCalledWith(mockCreateBookmarkParams);
      expect(result).toEqual(mockCreatedBookmark);
    });

    it('should throw a cannot bookmark error if the bookmark already exists', async () => {
      const userId = 1;
      const bookmark: BookmarkType = {
        id: 1,
        index: 'existingBookmark',
        name: 'Existing Bookmark',
        type: "MONSTER",
      };
      const mockExistingBookmark = { id: 1, userId, ...bookmark };
      (bookmarksRepository.getBookmark as jest.Mock).mockResolvedValue(mockExistingBookmark);
    
      await expect(bookmarksService.addBookmark(userId, bookmark)).rejects.toMatchObject({
        message: 'User already bookmarked this index!',
      });
      expect(bookmarksRepository.getBookmark).toHaveBeenCalledWith(userId, bookmark.index);
      expect(bookmarksRepository.addBookmark).not.toHaveBeenCalled();
    });    
  });
});
