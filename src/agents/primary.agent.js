import plannerAgent from "./planner.agent.js";
import toolAgent from "./tool.agents.js";

const primaryAgent = async (query) => {

  const startTime = Date.now(); 

  
  const plan = await plannerAgent(query);

 
  const execution = await toolAgent(query, plan.steps);

  const endTime = Date.now(); 

  return {
    thought: "User goal analyzed → AI planner generated workflow → execution agent dynamically invoked tools",

    reasoning: [
      "Detected intent from query",
      "Planner generated steps using Gemini",
      "Execution agent mapped steps to tools",
      "Context passed between tools"
    ],

    plan,
    ...execution,

    execution_time: `${endTime - startTime}ms` 
  };
};

export default primaryAgent;