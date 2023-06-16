import { notFoundError } from '@/errors';
import { CreateSpellParams } from '@/protocols';
import spellsRepository from '@/repositories/spells-repository';

export async function getSpell(userId: number, spellId: number) {
  const spell = await spellsRepository.getSpell(userId, spellId);
  if (!spell) throw notFoundError();

  return spell;
}

export async function getAllSpells(userId: number) {
  const spells = await spellsRepository.getAllSpells(userId);

  return spells;
}

async function removeSpell(userId: number, spellId: number) {
  await getSpell(userId, spellId);

  await spellsRepository.removeSpell(spellId);
}

async function addSpell(userId: number, spellsBody: any) {
  const spellData: CreateSpellParams = {
    userId,
    spell: spellsBody,
  };

  const spell = await spellsRepository.addSpell(spellData);

  return spell;
}

const spellsService = { 
  getSpell,
  getAllSpells,
  removeSpell,
  addSpell 
};

export default spellsService;
