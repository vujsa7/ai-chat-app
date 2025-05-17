import "dotenv/config";
import openai from "./openai.js";

const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
        {
            role: "system",
            content:
                "You are an AI cooking assistant and your job is to respond to people wanting to get cooking recipes."
        },
        { role: "user", content: "Hi, what can you help me with today?" }
    ]
});

console.log(response.choices[0].message.content);
