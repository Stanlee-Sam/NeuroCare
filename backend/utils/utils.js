/**
 * Calculate stress level percentage based on sentiment score and user input level.
 * @param {number} sentimentScore - A value between -1 and 1.
 * @param {number} userLevel - A user-provided level (say, on a scale of 1-10).
 * @returns {number} - Stress level as a percentage (0-100).
 */
const calculateStressPercentage = (sentimentScore, userLevel) => {
  let adjustedLevel = userLevel;

  if (sentimentScore < 0) {
    // For negative sentiment, force a high stress level (at least 6)
    adjustedLevel = Math.max(userLevel, 6);
  } else if (sentimentScore > 0) {
    // For positive sentiment, force a low stress level (at most 5)
    adjustedLevel = Math.min(userLevel, 5);
  }

  // Convert the level (scale 0-10) to a percentage
  return adjustedLevel * 10;
};

// Export the function
module.exports = { calculateStressPercentage };
