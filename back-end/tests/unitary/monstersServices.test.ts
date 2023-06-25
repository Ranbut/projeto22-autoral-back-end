import monstersService from '@/services/monsters-service';
import monstersRepository from '@/repositories/monsters-repository';

jest.mock('@/repositories/monsters-repository');

describe('Monsters Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getMonster', () => {
    it('should return the monster if found', async () => {
      const userId = 1;
      const monsterId = 1;
      const mockMonster = { id: 1, name: 'Monster 1' };
      (monstersRepository.getMonster as jest.Mock).mockResolvedValue(mockMonster);

      const result = await monstersService.getMonster(userId, monsterId);

      expect(monstersRepository.getMonster).toHaveBeenCalledWith(userId, monsterId);
      expect(result).toEqual(mockMonster);
    });

    it('should throw a not found error if the monster is not found', async () => {
      const userId = 1;
      const monsterId = 1;
      (monstersRepository.getMonster as jest.Mock).mockResolvedValue(null);


      await expect(monstersService.getMonster(userId, monsterId)).rejects.toMatchObject({
        message: 'No result for this search!',
      });
      expect(monstersRepository.getMonster).toHaveBeenCalledWith(userId, monsterId);
    });
  });

  describe('getAllMonsters', () => {
    it('should return all monsters for a user', async () => {
      const userId = 1;
      const mockMonsters = [{ id: 1, name: 'Monster 1' }, { id: 2, name: 'Monster 2' }];
      (monstersRepository.getAllMonsters as jest.Mock).mockResolvedValue(mockMonsters);

      const result = await monstersService.getAllMonsters(userId);

      expect(monstersRepository.getAllMonsters).toHaveBeenCalledWith(userId);
      expect(result).toEqual(mockMonsters);
    });
  });

  describe('removeMonster', () => {
    it('should remove the monster if it exists', async () => {
      const userId = 1;
      const monsterId = 1;
      (monstersRepository.getMonster as jest.Mock).mockResolvedValue({ id: monsterId, name: 'Monster 1' });

      await monstersService.removeMonster(userId, monsterId);

      expect(monstersRepository.getMonster).toHaveBeenCalledWith(userId, monsterId);
      expect(monstersRepository.removeMonster).toHaveBeenCalledWith(monsterId);
    });

    it('should throw a not found error if the monster is not found', async () => {
      const userId = 1;
      const monsterId = 1;
      (monstersRepository.getMonster as jest.Mock).mockResolvedValue(null);


      await expect(monstersService.getMonster(userId, monsterId)).rejects.toMatchObject({
        message: 'No result for this search!',
      });
      expect(monstersRepository.getMonster).toHaveBeenCalledWith(userId, monsterId);
      expect(monstersRepository.removeMonster).not.toHaveBeenCalled();
    });
  });

  describe('editMonster', () => {
    it('should edit the monster if it exists', async () => {
      const userId = 1;
      const monsterId = 1;
      const monsterData = { name: 'Updated Monster' };
      const mockMonster = { id: monsterId, name: 'Monster 1', ...monsterData };
      (monstersRepository.getMonster as jest.Mock).mockResolvedValue({ id: monsterId, name: 'Monster 1' });
      (monstersRepository.editMonster as jest.Mock).mockResolvedValue(mockMonster);

      const result = await monstersService.editMonster(userId, monsterId, monsterData);

      expect(monstersRepository.getMonster).toHaveBeenCalledWith(userId, monsterId);
      expect(monstersRepository.editMonster).toHaveBeenCalledWith(monsterId, monsterData);
      expect(result).toEqual(mockMonster);
    });

    it('should throw a not found error if the monster is not found', async () => {
      const userId = 1;
      const monsterId = 1;
      const monsterData = { name: 'Updated Monster' };
      (monstersRepository.getMonster as jest.Mock).mockResolvedValue(null);


      await expect(monstersService.getMonster(userId, monsterId)).rejects.toMatchObject({
        message: 'No result for this search!',
      });
      expect(monstersRepository.getMonster).toHaveBeenCalledWith(userId, monsterId);
      expect(monstersRepository.editMonster).not.toHaveBeenCalled();
    });
  });

  describe('addMonster', () => {
    it('should add a new monster', async () => {
      const userId = 1;
      const monsterData = { name: 'New Monster' };
      const mockMonster = { id: 1, name: 'New Monster' };
      const mockCreateMonsterParams = { userId, monster: monsterData };
      (monstersRepository.addMonster as jest.Mock).mockResolvedValue(mockMonster);

      const result = await monstersService.addMonster(userId, monsterData);

      expect(monstersRepository.addMonster).toHaveBeenCalledWith(mockCreateMonsterParams);
      expect(result).toEqual(mockMonster);
    });
  });
});
