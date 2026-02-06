/*
  Warnings:

  - Changed the type of `type` on the `SharableItem` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ShareItemType" AS ENUM ('TEXT', 'FILE');

-- AlterTable
ALTER TABLE "SharableItem" DROP COLUMN "type",
ADD COLUMN     "type" "ShareItemType" NOT NULL;
