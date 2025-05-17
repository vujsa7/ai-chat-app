import readline from "node:readline";
import "dotenv/config";
import openai from "./openai.js";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const formatMessage = (userInput) => {
    return { role: "user", content: userInput };
};

const newMessage = async (history, userMessage) => {
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [...history, userMessage]
    });

    return response.choices[0].message;
};

const chat = () => {
    const history = [
        {
            role: "system",
            content: ``
        }
    ];

    const start = () => {
        rl.question("You: ", async (userInput) => {
            if (userInput.toLowerCase() === "exit") {
                rl.close();
                return;
            }

            const userMessage = formatMessage(userInput);
            const response = await newMessage(history, userMessage);

            history.push(userMessage, response);
            console.log(`\n\nAI: ${response.content}\n\n`);
            start();
        });
    };

    start();
};

console.log("Chatbot initialized. Type 'exit' to end the chat.");
chat();
