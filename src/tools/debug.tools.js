export const analyzeLogs = async (query) => {
  if (query.toLowerCase().includes("econnrefused")) {
    return {
      errorType: "Connection Error",
      cause: "Server refused connection (likely DB not running)"
    };
  }

  if (query.toLowerCase().includes("500")) {
    return {
      errorType: "Internal Server Error",
      cause: "Backend crash or unhandled exception"
    };
  }

  return {
    errorType: "Unknown",
    cause: "Unable to detect error type"
  };
};


export const searchDocs = async (errorType) => {
  const solutions = {
    "Connection Error": "Ensure database/server is running and connection string is correct",
    "Internal Server Error": "Check logs and handle exceptions properly"
  };

  return solutions[errorType] || "No documentation found";
};


export const generateFix = async (errorType) => {
  if (errorType === "Connection Error") {
    return {
      fix: "Start MongoDB server",
      commands: ["mongod"],
      code: "mongoose.connect(process.env.MONGO_URI)",

      actionable: true,
      auto_execute_suggestion: "Run: mongod",

      // 🔥 ADD THIS
      next_step: "Would you like me to execute this fix?"
    };
  }

  return {
    fix: "Unknown issue",
    actionable: false,
    next_step: "Would you like more details?"
  };
};