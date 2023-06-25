import historyService from '@/services/history-service';
import historyRepository from '@/repositories/history-repository';

jest.mock('@/repositories/history-repository');

describe('History Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('addHistory', () => {
    it('should add a new history', async () => {
      const userId = 1;
      const index = 'newHistory';
      const name = 'New History';
      const type = 'MONSTER';
      const mockHistoryData = { userId, index, name, type };
      const mockCreatedHistory = { id: 1, userId, index, name, type };
      (historyRepository.getHistory as jest.Mock).mockResolvedValue(null);
      (historyRepository.addHistory as jest.Mock).mockResolvedValue(mockCreatedHistory);

      const result = await historyService.addHistory(userId, index, name, type);

      expect(historyRepository.getHistory).toHaveBeenCalledWith(index);
      expect(historyRepository.deleteHistory).not.toHaveBeenCalled();
      expect(historyRepository.addHistory).toHaveBeenCalledWith(mockHistoryData);
      expect(result).toEqual(mockCreatedHistory);
    });

    it('should delete existing history and add a new history', async () => {
      const userId = 1;
      const index = 'existingHistory';
      const name = 'Existing History';
      const type = 'SPELL';
      const mockExistingHistory = { id: 1, userId, index, name, type };
      const mockNewHistoryData = { userId, index, name, type };
      const mockCreatedNewHistory = { id: 2, userId, index, name, type };
      (historyRepository.getHistory as jest.Mock).mockResolvedValue(mockExistingHistory);
      (historyRepository.addHistory as jest.Mock).mockResolvedValue(mockCreatedNewHistory);

      const result = await historyService.addHistory(userId, index, name, type);

      expect(historyRepository.getHistory).toHaveBeenCalledWith(index);
      expect(historyRepository.deleteHistory).toHaveBeenCalledWith(mockExistingHistory.id);
      expect(historyRepository.addHistory).toHaveBeenCalledWith(mockNewHistoryData);
      expect(result).toEqual(mockCreatedNewHistory);
    });
  });

  describe('getAllHistory', () => {
    it('should get all history for a user', async () => {
      const userId = 1;
      const mockHistory = [
        { id: 1, userId, index: 'history1', name: 'History 1', type: 'EQUIPMENT' },
        { id: 2, userId, index: 'history2', name: 'History 2', type: 'MAGIC_ITEM' },
      ];
      (historyRepository.getAllHistory as jest.Mock).mockResolvedValue(mockHistory);

      const result = await historyService.getAllHistory(userId);

      expect(historyRepository.getAllHistory).toHaveBeenCalledWith(userId);
      expect(result).toEqual(mockHistory);
    });
  });

  describe('deleteAllHistory', () => {
    it('should delete all history for a user', async () => {
      const userId = 1;

      await historyService.deleteAllHistory(userId);

      expect(historyRepository.deleteAllHistory).toHaveBeenCalledWith(userId);
    });
  });
});
