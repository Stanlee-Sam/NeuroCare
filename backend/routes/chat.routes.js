const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();
const API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;



router.post("/chat", async (req, res) => {
  console.log("Request payload:", req.body);
    const { userMessage, sentiment, journalEntry } = req.body;

    try {
        const response = await axios.post(GEMINI_API_URL, {
          contents: [
            {
              parts: [
                // Guiding Instruction for Gemini
                {
                  text: `Here is a journal entry written by the user:\n\n"${journalEntry}".\n\nThe detected sentiment is "${sentiment?.mood || 'neutral'}". Please provide a response that acknowledges the specific content of the journal entry while also considering the sentiment until when the user changes the topic so go accordingly to what they say.If the journal entry is null or empty just respond to the entered user message. Avoid generic responses.`
                },
                {
                  text: "You are NeuroBot, a compassionate AI therapist. Please generate a response that is fully punctuated with proper spacing, clear sentence breaks, and new lines for each new point or bullet. Use proper grammar and include emojis where appropriate."
                }
               
                
                
                
                ,
                // {
                //   text: "You are an anime bot,you give anime recommendations with great back story to make someone gain interest use emoji where necessary."
                // }
                // ,
                
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
        let botReply = response.data.candidates?.[0]?.content?.parts?.[0]?.text; 
        // let botReply = response.data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim(); // Remove bold markdown
   

        if (!botReply) {
            throw new Error("No valid reply received from Gemini API");
          }
         botReply = cleanBotResponse(botReply);

        res.json({ reply: botReply });
      } catch (error) {
    console.error("Error calling Gemini API:", error.response?.data || error.message);

    res.status(500).json({
      error: "Failed to generate a response. Please try again later.",
      details: error.response?.data || error.message
    });
  }
});
function cleanBotResponse(text) {
  // Remove markdown bold formatting
  text = text.replace(/\*\*(.*?)\*\*/g, "$1");

  // Replace any bullet asterisk at the start of a line with a dash and a space.
  // The 'm' flag ensures that the pattern is applied per line.
  text = text.replace(/^\*\s+/gm, "- ");

  // If you have stray asterisks elsewhere that you don't need, you can remove them:
  // text = text.replace(/\*/g, "");

  // Replace multiple punctuation marks with a single instance
  text = text.replace(/([.!?])([.!?]+)/g, "$1");

  // Ensure a space after punctuation if missing
  text = text.replace(/([.!?])(?=[^\s])/g, "$1 ");

  // (Optional) Insert an HTML line break before bullet markers if needed
  // This ensures that if a dash is not already on a new line, we force it.
  text = text.replace(/([^\n])\s*-\s+/g, "$1<br>- ");

  // Remove extra spaces and trim the text
  text = text.replace(/\s{2,}/g, " ").trim();

  return text;
}




   module.exports = router;

