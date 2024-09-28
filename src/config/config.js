import {GoogleGenerativeAI,HarmCategory,HarmBlockThreshold} from "@google/generative-ai";
  
  const apiKey = "AIzaSyAnfSD4rNy3ULpmkP3T0mP7TDONNQ6knQw";
  const genAI = new GoogleGenerativeAI(apiKey);

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
  ];
  
  const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash", 
    safetySettings: safetySettings });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  async function run(prompt) {
    try {
      const chatSession = model.startChat({
        generationConfig,
        history: [],
      });
  
      const result = await chatSession.sendMessage(prompt);
      console.log(result.response.text());
      return result.response.text();
    } catch (error) {
      console.error("Error during AI response generation:", error);
    }
  }
  
export default run;