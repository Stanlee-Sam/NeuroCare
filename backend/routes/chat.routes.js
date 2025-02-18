const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();
const API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

router.post("/chat", async (req, res) => {
    const { userMessage } = req.body;

    try {
        const response = await axios.post(GEMINI_API_URL, {
          contents: [
            {
              parts: [
                // Guiding Instruction for Gemini
                {
                  text: "You are NeuroBot, a compassionate and supportive AI therapist specialized in mental health. Your role is to provide empathetic, thoughtful, and non-judgmental responses. Encourage self-reflection and well-being, but do not provide medical advice or diagnoses."
                },
                // User Input
                {
                  text: `User: ${userMessage}`
                }
              ]
            }
          ]
        });

        console.log("Gemini API Response:", response.data);
    
        // AI response
        const botReply = response.data.candidates?.[0]?.content?.parts?.[0]?.text;    

        if (!botReply) {
            throw new Error("No valid reply received from Gemini API");
          }
        const formattedReply = formatBotReply(botReply);

        res.json({ reply: formattedReply });
      } catch (error) {
    console.error("Error calling Gemini API:", error.response?.data || error.message);

    res.status(500).json({
      error: "Failed to generate a response. Please try again later.",
      details: error.response?.data || error.message
    });
  }
});
function formatBotReply(reply) {
    return reply
        .replace(/(\*\*)(.*?)(\*\*)/g, '$2') // Remove bold markers
        .replace(/\* /g, '• ') // Replace bullets with plain "•"
        .replace(/\n/g, '\n\n') // Add double line breaks for better spacing
        .replace(/• /g, '\n• '); // Ensure each bullet point starts on a new line
}
    module.exports = router;

