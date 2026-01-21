// import ChatBot from "react-chatbotify";
// import LlmConnector, {LlmConnectorBlock } from "@rcb-plugins/llm-connector";
// import { GeminiProvider } from "@rcb-plugins/llm-connector";
// import { OpenaiProvider } from "@rcb-plugins/llm-connector";
// import { useEffect } from "react";
//
// const Chatbot = () => {
//
//     const gemini = new GeminiProvider({
//         mode: "direct",                     // "direct" or "proxy"
//         model: "gemini-1.5-flash",          // required
//         apiKey: process.env.REACT_APP_GEMINI_API_KEY?? "", // required in "direct" mode
//         responseFormat: "stream",           // "stream" (default) or "json"
//     });
//
//     const flow = {
//         start: {
//             message: "Hi, how can I help you?",
//             transition: 0,
//             path: "llm_example_block",
//         },
//         llm_example_block: {
//             llmConnector: {
//                 provider: gemini
//             }
//         } as LlmConnectorBlock,
//         // ... other blocks as necessary
//     }
//
//     useEffect(() => {
//         console.log("Chatbot component mounted");
//     }, []);
//
//     return (
//         <div>
//         <h1>Chatbot Feature</h1>
//             <span>testing</span>
//         <p>This is the chatbot feature of the application.</p>
//             <ChatBot plugins={[LlmConnector()]} flow={flow}/>
//         </div>
//     );
// }
//
// export default Chatbot;