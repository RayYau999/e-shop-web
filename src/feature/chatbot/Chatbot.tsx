import ChatBot from "react-chatbotify";
import { GeminiProvider } from "@rcb-plugins/llm-connector";
import { useEffect } from "react";
import { Block } from "react-chatbotify/dist/types/Block";
import { EShopCommonFetchProps, McpRequestMsg, McpResponseMsg } from "../type/EShopCommonTypes";
import { fetchEShopData, useGetJwt } from "../common/EShopCommonFetch";

type ApiResult = { response: Response; data: McpResponseMsg };
const apiUrl = process.env.REACT_APP_SB_API_URL;
const mcpApiPath = process.env.REACT_APP_MCP_CLIENT_PATH;
const mcpUrl = `${apiUrl}${mcpApiPath}`;

const Chatbot = () => {
    if(typeof apiUrl === 'undefined' || typeof mcpApiPath === 'undefined') {
        throw new Error("API URL or MCP API Path is not defined in environment variables");
    }

    const jwt = useGetJwt();
    const gemini = new GeminiProvider({
        mode: "direct",                     // "direct" or "proxy"
        model: "gemini-1.5-flash",          // required
        apiKey: process.env.REACT_APP_GEMINI_API_KEY?? "", // required in "direct" mode
        responseFormat: "stream",           // "stream" (default) or "json"
    });

    const flow: Record<string, Block> = {
        start: {
            message: "Hi, how can I help you?",
            path: "loop"
        },
        loop: {
            message: async (message) => {
                // Call your local AI API
                console.log("calling ai api with message: ", message);
                console.log("mcpUrl:", mcpUrl);
                console.log("message.userInput: ", message.userInput);

                const requestBody: McpRequestMsg = {
                    message: message.userInput
                }

                const reqData: EShopCommonFetchProps = {
                    path: mcpUrl,
                    method: 'POST',
                    jwt: jwt,
                    body: requestBody
                }
                const apiResult: ApiResult = await fetchEShopData(reqData);
                console.log("apiResult: ", apiResult);
                console.log("apiResult data: ", apiResult.data);
                if (!apiResult.response.ok) return "Sorry, something went wrong.";

                const data = apiResult.data;
                return data.mcpResponse || "No reply received.";
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

    useEffect(() => {
        console.log("Chatbot component mounted");
    }, []);

    return (
      <ChatBot flow={flow}/>
    );
}

export default Chatbot;