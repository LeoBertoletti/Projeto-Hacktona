import { Configuration, OpenAIApi } from "openai";
import readline from "readline";

const configuration = new Configuration({
    apiKey: "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",
});

const openai = new OpenAIApi(configuration);

const userInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

userInterface.prompt();
var history = [];


userInterface.on("line", async (input) => {
    history.push({ role: "user", content: input });
    console.log(history);
    await openai
        .createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: history,
        })
        .then((res) => {
            history.push({ role: "system", content: res.data.choices[0].message.content });
            console.log(res.data.choices[0].message.content);
            userInterface.prompt();
        })
        .catch((e) => {
            console.log(e);
        });
});
