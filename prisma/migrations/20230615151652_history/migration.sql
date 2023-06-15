/*
  Warnings:

  - Changed the type of `type` on the `Bookmark` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TypeInfo" AS ENUM ('MONSTER', 'SPELL', 'EQUIPMENT', 'MAGIC_ITEM');

-- AlterTable
ALTER TABLE "Bookmark" DROP COLUMN "type",
ADD COLUMN     "type" "TypeInfo" NOT NULL;

-- DropEnum
DROP TYPE "TypeBookmark";

-- CreateTable
CREATE TABLE "History" (
    "id" SERIAL NOT NULL,
    "index" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "TypeInfo" NOT NULL,
    "userId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "History_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
