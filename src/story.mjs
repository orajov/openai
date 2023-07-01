import path from 'path';
import readline from "readline";
import { sendPrompt } from "./utils/request.mjs";

const name = path.basename(import.meta.url).slice(0, -4);
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const context = 'v poušti u řeky ve středověku, po bitvě, kolem sedí vojáci';
const constPrompt = '; nezapomínej na kontext příběhu, který odpovídá tomuto popisu: ' + context;

main();

function main() {
    rl.question('', (varPrompt) => {
        sendPrompt(varPrompt + constPrompt, name).then(result => {
            console.log(result);
            main();
        });
    });
}  