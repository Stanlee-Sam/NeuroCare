/*
  Warnings:

  - Made the column `userId` on table `FeatureUsage` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "FeatureUsage" ALTER COLUMN "userId" SET NOT NULL;
