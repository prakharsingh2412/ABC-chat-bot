import { createContext, useState } from 'react';
import run from '../config/config.js';  // Assuming 'run' is a function for handling prompt processing

// Create a Context for the chatbot
export const Context = createContext();

const ContextProvider = (props) => {
  // State variables to manage input, prompts, results, and loading
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  // Function to add a delay between rendering each word in the response
  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  // Function to reset the chat (clears results and stops loading)
  const newChat = () => {
    setLoading(false);
    setShowResult(false);
  };

  // Function to handle sending a prompt and updating the result
  const onSent = async (prompt) => {
    // Resetting the result area and starting the loading spinner
    setResultData("");
    setLoading(true);
    setShowResult(true);

    let response;

    // If a specific prompt is provided, use it; otherwise, use the input
    if (prompt !== undefined) {
      response = await run(prompt);
      setRecentPrompt(prompt);
    } else {
      setPrevPrompts((prev) => [...prev, input]);
      setRecentPrompt(input);
      response = await run(input);
    }

    // Process the response to format bold text surrounded by '**' and line breaks with '*'
    let formattedResponse = response
      .split("**")
      .map((part, index) => 
        (index % 2 === 1 ? `<b>${part}</b>` : part)
      )
      .join("")
      .split("*")
      .join("</br>")
      .split("\n")
      .join("<br />");

    // Split the formatted response into words and display them with a delay
    let wordsArray = formattedResponse.split(" ");
    wordsArray.forEach((word, i) => delayPara(i, word + " "));

    // Update the final result data and stop loading spinner
    setLoading(false);
    setInput("");
  };

  // The value that will be provided to components that consume this context
  const contextValue = {
    prevPrompts, 
    setPrevPrompts,
    onSent, 
    setRecentPrompt, 
    recentPrompt, 
    showResult, 
    loading, 
    resultData, 
    input, 
    setInput, 
    newChat,
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
