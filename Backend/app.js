require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

//express instance
const app = express();
//!middlewares
const corsOptions = {
  origin: ["http://localhost:5173/", "http://localhost:5174/"],
};
app.use(cors());
app.use(express.json());
// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

//!generate content route
app.post("/generate", async (req, res) => {
  const { prompt } = req.body;
  try {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    res.send(text);
  } catch (error) {
    console.log(error);
    res.status(500).send("Failed to generate content");
  }
});

//start the server
app.listen(8080, console.log("server is running"));
