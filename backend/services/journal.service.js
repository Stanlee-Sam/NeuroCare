const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getJournalEntries = async () => {
  return await prisma.journalEntry.findMany({
    include: { user: true },
  });
};

exports.saveJournalEntry = async (entry, sentimentScore, userId) => {
  return await prisma.journalEntry.create({
    data: {
      text: entry,
      sentimentScore: sentimentScore,
      sentiment: sentimentScore > 0.5 ? "positive" : "negative",
      user: { connect: { id: userId } },
    },
  });
};
