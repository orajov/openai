import readline from "readline";
import { OpenAiRequest } from "./utils/request.mjs";

const openAiRequest = new OpenAiRequest();
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function recurse() {
    rl.question('Text k opravě: ', (question) => {
        openAiRequest.getEdit(question).then(result => {
            console.log(result);
            recurse();
        });
    });
}

recurse();