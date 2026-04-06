import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI('AIzaSyB_dDPbX_46fNw72XSuEK04Bnr7S8pI9VM');

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash"
});

export default model;