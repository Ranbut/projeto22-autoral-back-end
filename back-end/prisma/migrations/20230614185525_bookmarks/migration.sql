-- AlterTable
ALTER TABLE "Character" ALTER COLUMN "portrait" DROP NOT NULL,
ALTER COLUMN "background" DROP NOT NULL,
ALTER COLUMN "languages" DROP NOT NULL,
ALTER COLUMN "personality_traits" DROP NOT NULL,
ALTER COLUMN "ideals" DROP NOT NULL,
ALTER COLUMN "bonds" DROP NOT NULL,
ALTER COLUMN "flaws" DROP NOT NULL,
ALTER COLUMN "hair" DROP NOT NULL,
ALTER COLUMN "skin" DROP NOT NULL,
ALTER COLUMN "eyes" DROP NOT NULL,
ALTER COLUMN "height" DROP NOT NULL,
ALTER COLUMN "weight" DROP NOT NULL,
ALTER COLUMN "age" DROP NOT NULL,
ALTER COLUMN "organizations" DROP NOT NULL,
ALTER COLUMN "allies" DROP NOT NULL,
ALTER COLUMN "enemies" DROP NOT NULL,
ALTER COLUMN "backstory" DROP NOT NULL,
ALTER COLUMN "other_notes" DROP NOT NULL;

-- CreateTable
CREATE TABLE "MonsterBookmark" (
    "id" SERIAL NOT NULL,
    "index" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MonsterBookmark_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpellBookmark" (
    "id" SERIAL NOT NULL,
    "index" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SpellBookmark_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EquipmentBookmark" (
    "id" SERIAL NOT NULL,
    "index" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EquipmentBookmark_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MagicItemBookmark" (
    "id" SERIAL NOT NULL,
    "index" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MagicItemBookmark_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MonsterBookmark" ADD CONSTRAINT "MonsterBookmark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpellBookmark" ADD CONSTRAINT "SpellBookmark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EquipmentBookmark" ADD CONSTRAINT "EquipmentBookmark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MagicItemBookmark" ADD CONSTRAINT "MagicItemBookmark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
