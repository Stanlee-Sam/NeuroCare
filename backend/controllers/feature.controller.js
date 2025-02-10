const { trackFeatureUsage, getFeatureUsage } = require("../services/feature.service.js");

const trackUsage = async (req, res) => {
  try {
    const { feature } = req.body;
    if (!feature) return res.status(400).json({ error: "Feature name is required" });

    const usage = await trackFeatureUsage(feature);
    res.status(200).json({ success: true, featureUsage: usage });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const fetchUsage = async (req, res) => {
  try {
    const usageData = await getFeatureUsage();
    res.status(200).json(usageData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { trackUsage, fetchUsage };
