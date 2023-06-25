-- CreateTable
CREATE TABLE "MagicItem" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "magicItem" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MagicItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MagicItem" ADD CONSTRAINT "MagicItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
