import primaryAgent from "../agents/primary.agent.js";

import express from "express";

const router = express.Router();

// TEMP test route
router.post("/ask", async (req, res) => {
  try {
    const { query } = req.body || {};

    if (!query) {
      return res.status(400).json({
        error: "Query is required"
      });
    }

    // 🧠 Call your AI system
    const response = await primaryAgent(query);

    res.json(response);

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      error: "Internal Server Error"
    });
  }
});

export default router;