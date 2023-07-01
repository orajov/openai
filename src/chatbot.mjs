import path from 'path';
import readline from "readline";
import { sendPrompt } from "./utils/request.mjs";

const name = path.basename(import.meta.url).slice(0, -4);
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

main();

function main() {
    rl.question('>', (prompt) => {
        sendPrompt(prompt, name).then(result => {
            console.log(result);
            main();
        });
    });
}  