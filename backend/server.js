const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const dotenv = require("dotenv");
const sentimentRoutes = require("./routes/sentiment.routes.js");
const featureRoutes = require("./routes/feature.routes.js");
const journalRoutes = require("./routes/journal.routes.js");
const chatRoutes = require("./routes/chat.routes.js");
const authRoutes = require("./routes/auth.routes.js");
const bodyParser = require("body-parser");
const errorHandler = require("./middleware/feature.middleware.js");
const authenticate = require("./middleware/authenticate.js");

dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = [
        "http://localhost:5173",
        "https://neuro-care-plum.vercel.app", // your Vercel frontend URL
      ];

      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.use("/api", chatRoutes);
//Routes
app.use("/api/auth", authRoutes);

app.use("/api", authenticate, sentimentRoutes);
app.use("/api/journal", authenticate, journalRoutes);
app.use("/api", authenticate, featureRoutes);
// app.use("/api", authenticate, chatRoutes);



app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
