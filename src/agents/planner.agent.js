import model from "../config/gemini.js";

const plannerAgent = async (query) => {
const prompt = `
You are an AI planner in a multi-agent system.

Available tools:
- analyzeLogs
- searchDocs
- generateFix
- saveMemory

User query: "${query}"

STRICT RULES:
- Return ONLY valid JSON
- No explanation
- No extra text

Format:
{
  "goal": "string",
  "steps": ["tool1", "tool2"]
}
`;

const result = await model.generateContent(prompt);
const text = result.response.text();

// 🧠 Extract ONLY JSON
const jsonMatch = text.match(/\{[\s\S]*\}/);

if (jsonMatch) {
  try {
    return JSON.parse(jsonMatch[0]);
  } catch (err) {
    console.log("JSON parse error:", err);
  }
}

// fallback
return {
  goal: "Fallback plan",
  steps: ["analyzeLogs", "generateFix"]
};
}
export default plannerAgent