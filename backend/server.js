const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const dotenv = require("dotenv");
const sentimentRoutes = require('./routes/sentiment.routes.js')
const featureRoutes = require('./routes/feature.routes.js')
const journalRoutes = require('./routes/journal.routes.js')
const bodyParser = require('body-parser');
const errorHandler = require("./middleware/feature.middleware.js")

dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

//Routes
app.use('/api', sentimentRoutes);
app.use('/api/journal', journalRoutes);
app.use('/api', featureRoutes)


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
