import { CreateCharacterParams } from '@/protocols';
import charactersRepository from '@/repositories/characters-repository';

async function createCharacter(userId: number, characterBody: any) {

    const characterData: CreateCharacterParams = {
      userId,
      ...characterBody,
    };
  
    const character = await charactersRepository.createCharacter(characterData);
  
    return character;
  }

const charactersService = { 
    createCharacter 
};

export default charactersService;
