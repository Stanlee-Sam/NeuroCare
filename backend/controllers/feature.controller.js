const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const { trackFeatureUsage, getFeatureUsage } = require("../services/feature.service.js");

const trackUsage = async (req, res) => {
  try {
    const { feature } = req.body;
    if (!feature) return res.status(400).json({ error: "Feature name is required" });

    const firebaseUid = req.user.firebaseUid;
    const user = await prisma.user.findUnique({
      where: { firebaseUid }
    })
    if (!user) return res.status(401).json({ error: "User not found" });

    const usage = await trackFeatureUsage(feature, user.id);
    res.status(200).json({ success: true, featureUsage: usage });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const fetchUsage = async (req, res) => {
  try {
    const firebaseUid = req.user.firebaseUid;
    const user =  await prisma.user.findUnique({
      where: { firebaseUid }
    })
    if (!user) return res.status(401).json({ error: "User not found" });

    const usageData = await getFeatureUsage(user.id);
    res.status(200).json(usageData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { trackUsage, fetchUsage };
