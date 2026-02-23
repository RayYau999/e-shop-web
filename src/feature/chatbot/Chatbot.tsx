import ChatBot from "react-chatbotify";
import LlmConnector, {LlmConnectorBlock } from "@rcb-plugins/llm-connector";
import { GeminiProvider } from "@rcb-plugins/llm-connector";
import { OpenaiProvider } from "@rcb-plugins/llm-connector";
import { useEffect } from "react";
import { Block } from "react-chatbotify/dist/types/Block";

const Chatbot = () => {

    const gemini = new GeminiProvider({
        mode: "direct",                     // "direct" or "proxy"
        model: "gemini-1.5-flash",          // required
        apiKey: process.env.REACT_APP_GEMINI_API_KEY?? "", // required in "direct" mode
        responseFormat: "stream",           // "stream" (default) or "json"
    });

    const flow: Record<string, Block> = {
        start: {
            message: "Hi, how can I help you? handmake",
            path: "loop"
        },
        loop: {
            message: async (message) => {
                // Call your local AI API
                console.log("calling ai api with message: ", message);
                const res = await fetch("http://localhost:9090/mcp-chat", {
                    method: "POST",
                    headers: { "Content-Type": "text/plain" },
                    body: message.userInput
                });

                if (!res.ok) return "Sorry, something went wrong.";

                const data = await res.text();
                return data || "No reply received.";
            },
            path: "loop"  // stay in loop
        }
        // llm_example_block: {
        //     llmConnector: {
        //         provider: gemini
        //     }
        // } as LlmConnectorBlock,
        // ... other blocks as necessary
    }

    const  handleClick = async() => {
        console.log("button clicked");
        const res = await fetch("http://localhost:9090/ai-chat", {
            method: "POST",
            headers: { "Content-Type": "text/plain" },
            body: "hello, this is ray"
        });
        console.log("res: ", res.text());
        // await fetch("http://localhost:9090/ai-chat", {
        //     method: "POST",
        //     headers: { "Content-Type": "text/plain" },
        //     body: "hello, this is ray"
        // });
    }
    useEffect(() => {
        console.log("Chatbot component mounted");
    }, []);

    return (
        <div>
            <button onClick={() => {handleClick()}}> testing ai button</button>
        <h1>Chatbot Feature</h1>
            <span>testing</span>
        <p>This is the chatbot feature of the application.</p>
            <ChatBot flow={flow}/>
        </div>
    );
}

export default Chatbot;