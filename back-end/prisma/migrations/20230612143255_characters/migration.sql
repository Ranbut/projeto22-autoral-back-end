-- CreateEnum
CREATE TYPE "CharacterAligments" AS ENUM ('CHAOTIC_EVIL', 'CHAOTIC_GOOD', 'CHAOTIC_NEUTRAL', 'LAWFUL_EVIL', 'LAWFUL_GOOD', 'LAWFUL_NEUTRAL', 'NEUTRAL', 'NEUTRAL_EVIL', 'NEUTRAL_GOOD');

-- CreateEnum
CREATE TYPE "CharacterRaces" AS ENUM ('DRAGONBORN', 'DWARF', 'ELF', 'GNOME', 'HALF_ELF', 'HALFLING', 'HALF_ORC', 'HUMAN', 'TIEFLING');

-- CreateEnum
CREATE TYPE "CharacterClasses" AS ENUM ('BARBARIAN', 'BARD', 'CLERIC', 'DRUID', 'FIGHTER', 'MONK', 'PALADIN', 'RANGER', 'ROGUE', 'SORCERER', 'WARLOCK', 'WIZARD');

-- CreateTable
CREATE TABLE "Character" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "name" VARCHAR(255) NOT NULL,
    "portrait" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "race" "CharacterRaces" NOT NULL,
    "class" "CharacterClasses" NOT NULL,
    "aligment" "CharacterAligments" NOT NULL,
    "background" TEXT NOT NULL,
    "strenght" INTEGER NOT NULL,
    "dexterity" INTEGER NOT NULL,
    "constitution" INTEGER NOT NULL,
    "intelligence" INTEGER NOT NULL,
    "wisdom" INTEGER NOT NULL,
    "charisma" INTEGER NOT NULL,
    "languages" TEXT NOT NULL,
    "personality_traits" TEXT NOT NULL,
    "ideals" TEXT NOT NULL,
    "bonds" TEXT NOT NULL,
    "flaws" TEXT NOT NULL,
    "hair" TEXT NOT NULL,
    "skin" TEXT NOT NULL,
    "eyes" TEXT NOT NULL,
    "height" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,
    "age" INTEGER NOT NULL,
    "organizations" TEXT NOT NULL,
    "allies" TEXT NOT NULL,
    "enemies" TEXT NOT NULL,
    "backstory" TEXT NOT NULL,
    "other_notes" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
