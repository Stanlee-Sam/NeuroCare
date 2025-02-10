const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const trackFeatureUsage = async (featureName) => {
  try {
    const feature = await prisma.featureUsage.upsert({
      where: { feature: featureName },
      update: { count: { increment: 1 } },
      create: { feature: featureName, count: 1 },
    });

    return feature;
  } catch (error) {
    console.error("Error tracking feature usage:", error);
    throw new Error("Could not track feature usage");
  }
};

const getFeatureUsage = async () => {
  try {
    return await prisma.featureUsage.findMany();
  } catch (error) {
    console.error("Error fetching feature usage:", error);
    throw new Error("Could not fetch feature usage");
  }
};

module.exports = {
  trackFeatureUsage,
  getFeatureUsage,
};
