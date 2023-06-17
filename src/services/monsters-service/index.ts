import { notFoundError } from '@/errors';
import { CreateMonsterParams, CreateSpellParams } from '@/protocols';
import spellsRepository from '@/repositories/monsters-repository';

export async function getMonster(userId: number, spellId: number) {
  const spell = await spellsRepository.getMonster(userId, spellId);
  if (!spell) throw notFoundError();

  return spell;
}

export async function getAllMonsters(userId: number) {
  const spells = await spellsRepository.getAllMonsters(userId);

  return spells;
}

async function removeMonster(userId: number, spellId: number) {
  await getMonster(userId, spellId);

  await spellsRepository.removeMonster(spellId);
}

async function addMonster(userId: number, monsterBody: any) {
  const monsterData: CreateMonsterParams = {
    userId,
    monster: monsterBody,
  };

  const spell = await spellsRepository.addMonster(monsterData);

  return spell;
}

const spellsService = { 
  getMonster,
  getAllMonsters,
  removeMonster,
  addMonster 
};

export default spellsService;
