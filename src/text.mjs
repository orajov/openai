import readline from "readline";
import { OpenAiRequest } from "./utils/request.mjs";

const openAiRequest = new OpenAiRequest();
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function recurse() {
    rl.question('Dotaz: ', (question) => {
        openAiRequest.getText(question).then(result => {
            console.log(result);
            recurse();
        });
    });
}

recurse();