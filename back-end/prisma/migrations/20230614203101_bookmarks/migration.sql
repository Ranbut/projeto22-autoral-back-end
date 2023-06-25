/*
  Warnings:

  - You are about to drop the `EquipmentBookmark` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MagicItemBookmark` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MonsterBookmark` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SpellBookmark` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "TypeBookmark" AS ENUM ('MONSTERS', 'SPELLS', 'EQUIPMENTS', 'MAGIC_ITEM');

-- DropForeignKey
ALTER TABLE "EquipmentBookmark" DROP CONSTRAINT "EquipmentBookmark_userId_fkey";

-- DropForeignKey
ALTER TABLE "MagicItemBookmark" DROP CONSTRAINT "MagicItemBookmark_userId_fkey";

-- DropForeignKey
ALTER TABLE "MonsterBookmark" DROP CONSTRAINT "MonsterBookmark_userId_fkey";

-- DropForeignKey
ALTER TABLE "SpellBookmark" DROP CONSTRAINT "SpellBookmark_userId_fkey";

-- DropTable
DROP TABLE "EquipmentBookmark";

-- DropTable
DROP TABLE "MagicItemBookmark";

-- DropTable
DROP TABLE "MonsterBookmark";

-- DropTable
DROP TABLE "SpellBookmark";

-- CreateTable
CREATE TABLE "Bookmark" (
    "id" SERIAL NOT NULL,
    "index" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "TypeBookmark" NOT NULL,
    "userId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Bookmark_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
