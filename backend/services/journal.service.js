const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { calculateStressPercentage } = require('../utils/utils.js')


exports.getJournalEntries = async () => {
  try {
    const entries = await prisma.journalEntry.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      // take : 3,
    });
    return entries;
  } catch (err) {
    throw new Error("Error fetching journal entries: " + err.message);
  }
};

exports.getRecentJournalEntries = async () => {
  try {
    const entries = await prisma.journalEntry.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      take: 3, 
    });
    return entries;
  } catch (err) {
    throw new Error("Error fetching recent journal entries: " + err.message);
  }
};


exports.getAllJournalEntries = async () => {
  try {
    const entries = await prisma.journalEntry.findMany({
      orderBy: {
        createdAt: 'asc'
      }
      
    });

    return entries.map(entry => ({
      name: new Date(entry.createdAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      }),
      // Level: entry.sentimentScore,
      Level: entry.level, 
      createdAt : entry.createdAt
    }));
  } catch (err) {
    throw new Error("Error fetching all journal entries: " + err.message);
  }
};

exports.saveJournalEntry = async (text, sentiment, sentimentScore, level, userId) => {
  try {
    console.log("➡️ Received Parameters:");
    console.log("Text:", text);
    console.log("Sentiment:", sentiment);
    console.log("Sentiment Score:", sentimentScore);
    console.log("Level:", level);
    console.log("User ID:", userId);

    if (!userId) {
      throw new Error("User ID is required to save a journal entry.");
    }

    const stressPercentage = calculateStressPercentage(sentimentScore, level);

    const savedEntry = await prisma.journalEntry.create({
      data: {
        text, 
        sentiment, 
        sentimentScore, 
        level: stressPercentage,
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



exports.deleteJournalEntry = async (entryId) => {
  try {
    const id = parseInt(entryId); 

    
    const existingEntry = await prisma.journalEntry.findUnique({
      where: { id },
    });

    if (!existingEntry) {
      throw new Error("Journal entry not found.");
    }

    
    const deletedEntry = await prisma.journalEntry.delete({
      where: { id },
    });

    return deletedEntry;
  } catch (err) {
    throw new Error("Error deleting journal entry: " + err.message);
  }
};

