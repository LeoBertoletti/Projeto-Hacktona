import { Configuration, OpenAIApi } from "openai";
import readline from "readline";

const configuration = new Configuration({
    apiKey: "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"
});

const openai = new OpenAIApi(configuration);

const userInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

var history = [];

history.push({
    role: 'system',
    content: 'Você é um professor tentando ensinar uma criança à ler e escrever. Faça apenas uma pergunta por resposta e só passe para o próximo nível de complexidade quando o aluno apresentar ter absorvido o conteúdo, mesmo que ele precise realizar várias tarefas, mas sempre ajude com dicas. Comece pelo alfabeto, depois passe para as vogais, depois consoantes, depois silabas e então palavras completas. Lembre-se que está falando com uma criança, então seja divertido, animado e simpático. Evite utilizar músicas. Você não pode utilizar palavras ou temas que sejam inadequados para crianças.'
})

userInterface.prompt();

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
