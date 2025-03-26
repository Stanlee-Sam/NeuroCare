const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const trackFeatureUsage = async (featureName, userId) => {
  try {
    // Try to find an existing record for this feature and user
    let feature = await prisma.featureUsage.findFirst({
      where: { feature: featureName, userId: userId },
    });

    if (feature) {
      // If found, update (increment the count)
      feature = await prisma.featureUsage.update({
        where: { id: feature.id },
        data: { count: { increment: 1 } },
      });
    } else {
      // Otherwise, create a new record
      feature = await prisma.featureUsage.create({
        data: { feature: featureName, count: 1, userId: userId },
      });
    }
    return feature;
  } catch (error) {
    console.error("Error tracking feature usage:", error);
    throw new Error("Could not track feature usage");
  }
};


const getFeatureUsage = async (userId) => {
  try {
    return await prisma.featureUsage.findMany({
      where: { userId }
      
    });
  } catch (error) {
    console.error("Error fetching feature usage:", error);
    throw new Error("Could not fetch feature usage");
  }
};

module.exports = {
  trackFeatureUsage,
  getFeatureUsage,
};
