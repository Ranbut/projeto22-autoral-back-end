import { Prisma } from '@prisma/client';
import { prisma } from '@/config';

async function createCharacter(data: Prisma.CharacterCreateInput) {
  return prisma.character.create({
    data,
  });
}

const characterRepository = {
    createCharacter,
};

export default characterRepository;
