import Memory from "../models/Memory.model.js";

export const saveMemory = async (data) => {
  const entry = new Memory(data);
  await entry.save();
  return "Saved to memory";
};

export const getHistory = async () => {
  return await Memory.find().sort({ createdAt: -1 });
};
export const findSimilar = async (query) => {
  return await Memory.findOne({
    query: { $regex: query, $options: "i" }
  });
};