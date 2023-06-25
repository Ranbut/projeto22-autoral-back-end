import equipmentsService from '@/services/equipments-service';
import equipmentsRepository from '@/repositories/equipments-repository';

jest.mock('@/repositories/equipments-repository');

describe('Equipments Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getEquipment', () => {
    it('should return the equipment if found', async () => {
      const userId = 1;
      const equipmentId = 1;
      const mockEquipment = { id: 1, name: 'Equipment 1' };
      (equipmentsRepository.getEquipment as jest.Mock).mockResolvedValue(mockEquipment);

      const result = await equipmentsService.getEquipment(userId, equipmentId);

      expect(equipmentsRepository.getEquipment).toHaveBeenCalledWith(userId, equipmentId);
      expect(result).toEqual(mockEquipment);
    });

    it('should throw a not found error if the equipment is not found', async () => {
      const userId = 1;
      const equipmentId = 1;
      (equipmentsRepository.getEquipment as jest.Mock).mockResolvedValue(null);


      await expect(equipmentsService.getEquipment(userId, equipmentId)).rejects.toMatchObject({
        message: 'No result for this search!',
      });
      expect(equipmentsRepository.getEquipment).toHaveBeenCalledWith(userId, equipmentId);
    });
  });

  describe('getAllEquipments', () => {
    it('should return all equipments for a user', async () => {
      const userId = 1;
      const mockEquipments = [{ id: 1, name: 'Equipment 1' }, { id: 2, name: 'Equipment 2' }];
      (equipmentsRepository.getAllEquipments as jest.Mock).mockResolvedValue(mockEquipments);

      const result = await equipmentsService.getAllEquipments(userId);

      expect(equipmentsRepository.getAllEquipments).toHaveBeenCalledWith(userId);
      expect(result).toEqual(mockEquipments);
    });
  });

  describe('removeEquipment', () => {
    it('should remove the equipment if it exists', async () => {
      const userId = 1;
      const equipmentId = 1;
      (equipmentsRepository.getEquipment as jest.Mock).mockResolvedValue({ id: equipmentId, name: 'Equipment 1' });

      await equipmentsService.removeEquipment(userId, equipmentId);

      expect(equipmentsRepository.getEquipment).toHaveBeenCalledWith(userId, equipmentId);
      expect(equipmentsRepository.removeEquipment).toHaveBeenCalledWith(equipmentId);
    });

    it('should throw a not found error if the equipment is not found', async () => {
      const userId = 1;
      const equipmentId = 1;
      (equipmentsRepository.getEquipment as jest.Mock).mockResolvedValue(null);


      await expect(equipmentsService.getEquipment(userId, equipmentId)).rejects.toMatchObject({
        message: 'No result for this search!',
      });
      expect(equipmentsRepository.getEquipment).toHaveBeenCalledWith(userId, equipmentId);
      expect(equipmentsRepository.removeEquipment).not.toHaveBeenCalled();
    });
  });

  describe('editEquipment', () => {
    it('should edit the equipment if it exists', async () => {
      const userId = 1;
      const equipmentId = 1;
      const equipmentData = { name: 'Updated Equipment' };
      const mockEquipment = { id: equipmentId, name: 'Equipment 1', ...equipmentData };
      (equipmentsRepository.getEquipment as jest.Mock).mockResolvedValue({ id: equipmentId, name: 'Equipment 1' });
      (equipmentsRepository.editEquipment as jest.Mock).mockResolvedValue(mockEquipment);

      const result = await equipmentsService.editEquipment(userId, equipmentId, equipmentData);

      expect(equipmentsRepository.getEquipment).toHaveBeenCalledWith(userId, equipmentId);
      expect(equipmentsRepository.editEquipment).toHaveBeenCalledWith(equipmentId, equipmentData);
      expect(result).toEqual(mockEquipment);
    });

    it('should throw a not found error if the equipment is not found', async () => {
      const userId = 1;
      const equipmentId = 1;
      const equipmentData = { name: 'Updated Equipment' };
      (equipmentsRepository.getEquipment as jest.Mock).mockResolvedValue(null);


      await expect(equipmentsService.getEquipment(userId, equipmentId)).rejects.toMatchObject({
        message: 'No result for this search!',
      });
      expect(equipmentsRepository.getEquipment).toHaveBeenCalledWith(userId, equipmentId);
      expect(equipmentsRepository.editEquipment).not.toHaveBeenCalled();
    });
  });

  describe('addEquipment', () => {
    it('should add a new equipment', async () => {
      const userId = 1;
      const equipmentData = { name: 'New Equipment' };
      const mockEquipment = { id: 1, name: 'New Equipment' };
      const mockCreateEquipmentParams = { userId, equipment: equipmentData };
      (equipmentsRepository.addEquipment as jest.Mock).mockResolvedValue(mockEquipment);

      const result = await equipmentsService.addEquipment(userId, equipmentData);

      expect(equipmentsRepository.addEquipment).toHaveBeenCalledWith(mockCreateEquipmentParams);
      expect(result).toEqual(mockEquipment);
    });
  });
});
