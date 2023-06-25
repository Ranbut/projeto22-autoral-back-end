import { notFoundError } from '@/errors';
import { CreateMonsterParams } from '@/protocols';
import monstersRepository from '@/repositories/monsters-repository';

export async function getMonster(userId: number, monsterId: number) {
  const monster = await monstersRepository.getMonster(userId, monsterId);
  if (!monster) throw notFoundError();

  return monster;
}

export async function getAllMonsters(userId: number) {
  const monsters = await monstersRepository.getAllMonsters(userId);

  return monsters;
}

async function removeMonster(userId: number, monsterId: number) {
  await getMonster(userId, monsterId);

  await monstersRepository.removeMonster(monsterId);
}

async function editMonster(userId: number, monsterId: number, monsterBody: any) {
  await getMonster(userId, monsterId);

  const monster = await monstersRepository.editMonster(monsterId, monsterBody);

  return monster;
}

async function addMonster(userId: number, monsterBody: any) {
  const monsterData: CreateMonsterParams = {
    userId,
    monster: monsterBody,
  };

  const monster = await monstersRepository.addMonster(monsterData);

  return monster;
}

const monstersService = { 
  getMonster,
  getAllMonsters,
  removeMonster,
  editMonster,
  addMonster 
};

export default monstersService;
