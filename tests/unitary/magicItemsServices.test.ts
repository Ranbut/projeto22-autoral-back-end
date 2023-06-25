import magicItemsService from '@/services/magic-items-service';
import magicItemsRepository from '@/repositories/magic-items-repository';

jest.mock('@/repositories/magic-items-repository');

describe('Magic Items Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getMagicItem', () => {
    it('should return the magic item if found', async () => {
      const userId = 1;
      const magicItemId = 1;
      const mockMagicItem = { id: 1, name: 'Magic Item 1' };
      (magicItemsRepository.getMagicItem as jest.Mock).mockResolvedValue(mockMagicItem);

      const result = await magicItemsService.getMagicItem(userId, magicItemId);

      expect(magicItemsRepository.getMagicItem).toHaveBeenCalledWith(userId, magicItemId);
      expect(result).toEqual(mockMagicItem);
    });

    it('should throw a not found error if the magic item is not found', async () => {
      const userId = 1;
      const magicItemId = 1;
      (magicItemsRepository.getMagicItem as jest.Mock).mockResolvedValue(null);


      await expect(magicItemsService.getMagicItem(userId, magicItemId)).rejects.toMatchObject({
        message: 'No result for this search!',
      });
      expect(magicItemsRepository.getMagicItem).toHaveBeenCalledWith(userId, magicItemId);
    });
  });

  describe('getAllMagicItems', () => {
    it('should return all magic items for a user', async () => {
      const userId = 1;
      const mockMagicItems = [{ id: 1, name: 'Magic Item 1' }, { id: 2, name: 'Magic Item 2' }];
      (magicItemsRepository.getAllMagicItems as jest.Mock).mockResolvedValue(mockMagicItems);

      const result = await magicItemsService.getAllMagicItems(userId);

      expect(magicItemsRepository.getAllMagicItems).toHaveBeenCalledWith(userId);
      expect(result).toEqual(mockMagicItems);
    });
  });

  describe('removeMagicItem', () => {
    it('should remove the magic item if it exists', async () => {
      const userId = 1;
      const magicItemId = 1;
      (magicItemsRepository.getMagicItem as jest.Mock).mockResolvedValue({ id: magicItemId, name: 'Magic Item 1' });

      await magicItemsService.removeMagicItem(userId, magicItemId);

      expect(magicItemsRepository.getMagicItem).toHaveBeenCalledWith(userId, magicItemId);
      expect(magicItemsRepository.removeMagicItem).toHaveBeenCalledWith(magicItemId);
    });

    it('should throw a not found error if the magic item is not found', async () => {
      const userId = 1;
      const magicItemId = 1;
      (magicItemsRepository.getMagicItem as jest.Mock).mockResolvedValue(null);


      await expect(magicItemsService.getMagicItem(userId, magicItemId)).rejects.toMatchObject({
        message: 'No result for this search!',
      });
      expect(magicItemsRepository.getMagicItem).toHaveBeenCalledWith(userId, magicItemId);
      expect(magicItemsRepository.removeMagicItem).not.toHaveBeenCalled();
    });
  });

  describe('editMagicItem', () => {
    it('should edit the magic item if it exists', async () => {
      const userId = 1;
      const magicItemId = 1;
      const magicItemData = { name: 'Updated Magic Item' };
      const mockMagicItem = { id: magicItemId, name: 'Magic Item 1', ...magicItemData };
      (magicItemsRepository.getMagicItem as jest.Mock).mockResolvedValue({ id: magicItemId, name: 'Magic Item 1' });
      (magicItemsRepository.editMagicItem as jest.Mock).mockResolvedValue(mockMagicItem);

      const result = await magicItemsService.editMagicItem(userId, magicItemId, magicItemData);

      expect(magicItemsRepository.getMagicItem).toHaveBeenCalledWith(userId, magicItemId);
      expect(magicItemsRepository.editMagicItem).toHaveBeenCalledWith(magicItemId, magicItemData);
      expect(result).toEqual(mockMagicItem);
    });

    it('should throw a not found error if the magic item is not found', async () => {
      const userId = 1;
      const magicItemId = 1;
      const magicItemData = { name: 'Updated Magic Item' };
      (magicItemsRepository.getMagicItem as jest.Mock).mockResolvedValue(null);


      await expect(magicItemsService.getMagicItem(userId, magicItemId)).rejects.toMatchObject({
        message: 'No result for this search!',
      });
      expect(magicItemsRepository.getMagicItem).toHaveBeenCalledWith(userId, magicItemId);
      expect(magicItemsRepository.editMagicItem).not.toHaveBeenCalled();
    });
  });

  describe('addMagicItem', () => {
    it('should add a new magic Item', async () => {
      const userId = 1;
      const magicItemData = { name: 'New Magic Item' };
      const mockMagicItem = { id: 1, name: 'New Magic Item' };
      const mockCreateMagicItemParams = { userId, magicItem: magicItemData };
      (magicItemsRepository.addMagicItem as jest.Mock).mockResolvedValue(mockMagicItem);

      const result = await magicItemsService.addMagicItem(userId, magicItemData);

      expect(magicItemsRepository.addMagicItem).toHaveBeenCalledWith(mockCreateMagicItemParams);
      expect(result).toEqual(mockMagicItem);
    });
  });
});
