import mongoose from "mongoose";

const memorySchema = new mongoose.Schema({
  query: String,
  steps: Array,
  result: Object
}, { timestamps: true });

export default mongoose.model("Memory", memorySchema);