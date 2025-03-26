const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { calculateStressPercentage } = require('../utils/utils.js')


exports.getJournalEntries = async (firebaseUid) => {
  try {
    const user = await prisma.user.findUnique({
      where: { firebaseUid },
    });
    if (!user) {
      throw new Error("User not found. Ensure they have been authenticated via Firebase.");
    }
    const entries = await prisma.journalEntry.findMany({
      where : { userId: user.id },
      orderBy: {
        createdAt: 'desc'
      },
    });
    return entries;
  } catch (err) {
    throw new Error("Error fetching journal entries: " + err.message);
  }
};

exports.getRecentJournalEntries = async (firebaseUid) => {
  try {
    const user = await prisma.user.findUnique({
      where: { firebaseUid },
    });

    if (!user) throw new Error("User not found.");

    const entries = await prisma.journalEntry.findMany({
      where : { userId: user.id },
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


exports.getAllJournalEntries = async (firebaseUid) => {
  try {
    const user = await prisma.user.findUnique({
      where: { firebaseUid },
    });

    if (!user) throw new Error("User not found.");
    const entries = await prisma.journalEntry.findMany({
      where : { userId : user.id },
      orderBy: {
        createdAt: 'asc'
      }
      
    });

    return entries.map(entry => ({
      name: new Date(entry.createdAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      }),
      Level: entry.level, 
      createdAt : entry.createdAt
    }));
  } catch (err) {
    throw new Error("Error fetching all journal entries: " + err.message);
  }
};

exports.saveJournalEntry = async (text, sentiment, sentimentScore, level, firebaseUid) => {
  try {
    
    if (!firebaseUid) {
      throw new Error("Firebase UID is required to save a journal entry.");
    }

    const user = await prisma.user.findUnique({
      where: { firebaseUid },
    });

    if (!user) {
      throw new Error("User not found. Ensure they have been authenticated via Firebase.");
    }

    const stressPercentage = calculateStressPercentage(sentimentScore, level);

    const savedEntry = await prisma.journalEntry.create({
      data: {
        text, 
        sentiment, 
        sentimentScore, 
        level: stressPercentage,
        userId : user.id,
      }
    });

    return savedEntry;
  } catch (err) {
    throw new Error("Error saving journal entry: " + err.message); 
  }
};



exports.deleteJournalEntry = async (entryId, firebaseUid) => {
  try {
    if (!entryId || !firebaseUid) {
      throw new Error("Entry ID and user authentication are required.");
    }

    // Get user from Firebase UID
    const user = await prisma.user.findUnique({
      where: { firebaseUid },
    });

    if (!user) {
      throw new Error("User not found.");
    }

    // Check if the entry exists and belongs to the user
    const existingEntry = await prisma.journalEntry.findUnique({
      where: { id: parseInt(entryId) },
    });

    if (!existingEntry || existingEntry.userId !== user.id) {
      throw new Error("Journal entry not found or does not belong to the user.");
    }

    // Delete the entry
    const deletedEntry = await prisma.journalEntry.delete({
      where: { id: parseInt(entryId) },
    });

    return deletedEntry;
  } catch (err) {
    throw new Error("Error deleting journal entry: " + err.message);
  }
};


