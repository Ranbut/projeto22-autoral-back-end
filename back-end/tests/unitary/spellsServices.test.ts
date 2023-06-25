import spellsService from '@/services/spells-service';
import spellsRepository from '@/repositories/spells-repository';

jest.mock('@/repositories/spells-repository');

describe('Spells Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getSpell', () => {
    it('should return the spell if found', async () => {
      const userId = 1;
      const spellId = 1;
      const mockSpell = { id: 1, name: 'Spell 1' };
      (spellsRepository.getSpell as jest.Mock).mockResolvedValue(mockSpell);

      const result = await spellsService.getSpell(userId, spellId);

      expect(spellsRepository.getSpell).toHaveBeenCalledWith(userId, spellId);
      expect(result).toEqual(mockSpell);
    });

    it('should throw a not found error if the spell is not found', async () => {
      const userId = 1;
      const spellId = 1;
      (spellsRepository.getSpell as jest.Mock).mockResolvedValue(null);


      await expect(spellsService.getSpell(userId, spellId)).rejects.toMatchObject({
        message: 'No result for this search!',
      });
      expect(spellsRepository.getSpell).toHaveBeenCalledWith(userId, spellId);
    });
  });

  describe('getAllSpells', () => {
    it('should return all spells for a user', async () => {
      const userId = 1;
      const mockSpells = [{ id: 1, name: 'Spell 1' }, { id: 2, name: 'Spell 2' }];
      (spellsRepository.getAllSpells as jest.Mock).mockResolvedValue(mockSpells);

      const result = await spellsService.getAllSpells(userId);

      expect(spellsRepository.getAllSpells).toHaveBeenCalledWith(userId);
      expect(result).toEqual(mockSpells);
    });
  });

  describe('removeSpell', () => {
    it('should remove the spell if it exists', async () => {
      const userId = 1;
      const spellId = 1;
      (spellsRepository.getSpell as jest.Mock).mockResolvedValue({ id: spellId, name: 'Spell 1' });

      await spellsService.removeSpell(userId, spellId);

      expect(spellsRepository.getSpell).toHaveBeenCalledWith(userId, spellId);
      expect(spellsRepository.removeSpell).toHaveBeenCalledWith(spellId);
    });

    it('should throw a not found error if the spell is not found', async () => {
      const userId = 1;
      const spellId = 1;
      (spellsRepository.getSpell as jest.Mock).mockResolvedValue(null);


      await expect(spellsService.getSpell(userId, spellId)).rejects.toMatchObject({
        message: 'No result for this search!',
      });
      expect(spellsRepository.getSpell).toHaveBeenCalledWith(userId, spellId);
      expect(spellsRepository.removeSpell).not.toHaveBeenCalled();
    });
  });

  describe('editSpell', () => {
    it('should edit the spell if it exists', async () => {
      const userId = 1;
      const spellId = 1;
      const spellData = { name: 'Updated Spell' };
      const mockSpell = { id: spellId, name: 'Spell 1', ...spellData };
      (spellsRepository.getSpell as jest.Mock).mockResolvedValue({ id: spellId, name: 'Spell 1' });
      (spellsRepository.editSpell as jest.Mock).mockResolvedValue(mockSpell);

      const result = await spellsService.editSpell(userId, spellId, spellData);

      expect(spellsRepository.getSpell).toHaveBeenCalledWith(userId, spellId);
      expect(spellsRepository.editSpell).toHaveBeenCalledWith(spellId, spellData);
      expect(result).toEqual(mockSpell);
    });

    it('should throw a not found error if the spell is not found', async () => {
      const userId = 1;
      const spellId = 1;
      const spellData = { name: 'Updated Spell' };
      (spellsRepository.getSpell as jest.Mock).mockResolvedValue(null);


      await expect(spellsService.getSpell(userId, spellId)).rejects.toMatchObject({
        message: 'No result for this search!',
      });
      expect(spellsRepository.getSpell).toHaveBeenCalledWith(userId, spellId);
      expect(spellsRepository.editSpell).not.toHaveBeenCalled();
    });
  });

  describe('addSpell', () => {
    it('should add a new spell', async () => {
      const userId = 1;
      const spellData = { name: 'New Spell' };
      const mockSpell = { id: 1, name: 'New Spell' };
      const mockCreateSpellParams = { userId, spell: spellData };
      (spellsRepository.addSpell as jest.Mock).mockResolvedValue(mockSpell);

      const result = await spellsService.addSpell(userId, spellData);

      expect(spellsRepository.addSpell).toHaveBeenCalledWith(mockCreateSpellParams);
      expect(result).toEqual(mockSpell);
    });
  });
});
