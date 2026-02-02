-- CreateEnum
CREATE TYPE "ShareAuthority" AS ENUM ('ADMIN', 'TEXT_ONLY');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "authority" "ShareAuthority" NOT NULL DEFAULT 'TEXT_ONLY';
