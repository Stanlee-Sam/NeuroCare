/*
  Warnings:

  - A unique constraint covering the columns `[feature,userId]` on the table `FeatureUsage` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "FeatureUsage_feature_userId_key" ON "FeatureUsage"("feature", "userId");
