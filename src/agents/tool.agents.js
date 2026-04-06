import { analyzeLogs, searchDocs, generateFix } from "../tools/debug.tools.js";
import { saveMemory } from "../tools/memory.tools.js";
import { findSimilar } from "../tools/memory.tools.js";
const toolMap = {
  analyzeLogs,
  searchDocs,
  generateFix,
  saveMemory
};

const toolAgent = async (query, steps) => {
  let context = {};
  let tools_used = [];


const past = await findSimilar(query);

if (past) {
  return {
    tools_used: ["memoryRecall (cache hit)"],
    reused: true,
    confidence: 0.95,
    result: {
      ...past.result,

      // 🔥 ADD THIS
      next_step: "Would you like me to execute this fix?"
    }
  };
}

for (let step of steps) {
  const tool = toolMap[step];
  if (!tool) continue;

  // 🧠 FIX ORDER DEPENDENCY
  if (step === "searchDocs" && !context.errorType) {
    // run analyzeLogs first automatically
    const logResult = await analyzeLogs(query);
    context = { ...context, ...logResult };
    tools_used.push("analyzeLogs (auto)");
  }

  tools_used.push(step);

  if (step === "analyzeLogs") {
    const result = await tool(query);
    context = { ...context, ...result };
  }

  else if (step === "searchDocs") {
    const result = await tool(context.errorType);
    context.solution = result;
  }

  else if (step === "generateFix") {
    const result = await tool(context.errorType);
    context = { ...context, ...result };
  }

else if (step === "saveMemory") {
  await tool({
    query,
    steps,
    result: {
      ...context,
      next_step: "Would you like me to execute this fix?"
    }
  });
}
}

const confidence = context.errorType === "Unknown" ? 0.5 : 0.9;

return {
  tools_used,
  confidence,
  result: context
};
};

export default toolAgent;