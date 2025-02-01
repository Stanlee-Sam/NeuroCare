const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


exports.getJournalEntries = async () => {
  try {
    const entries = await prisma.journalEntry.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      take : 3,
    });
    return entries;
  } catch (err) {
    throw new Error("Error fetching journal entries: " + err.message);
  }
};



exports.saveJournalEntry = async (text, sentiment, sentimentScore, userId) => {
  try {
    
    const savedEntry = await prisma.journalEntry.create({
      data: {
        text, 
        sentiment, 
        sentimentScore, 
        userId
      }
    });
    console.log("Saved Entry:", savedEntry);
    return savedEntry;
  } catch (err) {
    console.error("Error saving journal entry:", err);
    throw new Error("Error saving journal entry: " + err.message); 
  }
};

