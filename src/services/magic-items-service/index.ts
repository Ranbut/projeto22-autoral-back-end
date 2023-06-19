import { notFoundError } from '@/errors';
import { CreateMagicItemParams } from '@/protocols';
import magicItemsRepository from '@/repositories/magic-items-repository';

export async function getMagicItem(userId: number, magicItemId: number) {
  const magicItem = await magicItemsRepository.getMagicItem(userId, magicItemId);
  if (!magicItem) throw notFoundError();

  return magicItem;
}

export async function getAllMagicItems(userId: number) {
  const magicItems = await magicItemsRepository.getAllMagicItems(userId);

  return magicItems;
}

async function removeMagicItem(userId: number, magicItemId: number) {
  await getMagicItem(userId, magicItemId);

  await magicItemsRepository.removeMagicItem(magicItemId);
}

async function addMagicItem(userId: number, magicItemsBody: any) {
  const magicItemData: CreateMagicItemParams = {
    userId,
    magicItem: magicItemsBody,
  };

  const magicItem = await magicItemsRepository.addMagicItem(magicItemData);

  return magicItem;
}

const magicItemsService = { 
  getMagicItem,
  getAllMagicItems,
  removeMagicItem,
  addMagicItem 
};

export default magicItemsService;
