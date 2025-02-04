const calculateStressPercentage = (sentimentScore, level) => {
    let baseStress;
  
    if (sentimentScore <= -0.3) {
        baseStress = Math.floor(Math.random() * (100 - 70 + 1)) + 70; // 70-100%
    } else if (sentimentScore > -0.3 && sentimentScore < 0.3) {
        baseStress = Math.floor(Math.random() * (69 - 40 + 1)) + 40; // 40-69%
    } else {
        baseStress = Math.floor(Math.random() * (39 - 10 + 1)) + 10; // 10-39%
    }
  
    
    return Math.min(100, baseStress + (level * 0.2));
  };
  