const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


exports.getJournalEntries = async () => {
  try {
    const entries = await prisma.journalEntry.findMany();
    return entries;
  } catch (err) {
    throw new Error("Error fetching journal entries: " + err.message);
  }
};

exports.saveJournalEntry = async (entry, sentimentScore, sentiment, userId) => {
  try {
    const savedEntry = await prisma.journalEntry.create({
      data: {
        text: entry,            
        sentimentScore,         
        sentiment,              
        userId,                 
      }
    });
    return savedEntry;
  } catch (err) {
    console.error('Error saving journal entry:', err);
    throw err;  
  }
};

