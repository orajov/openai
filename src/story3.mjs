import path from 'path';
import readline from "readline";
import { sendPrompt } from "./utils/request.mjs";

const name = path.basename(import.meta.url).slice(0, -4);
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const openPrompt = 'Zahrajeme si hru, dáš mi vždy 3 možnosti, jak se má rozvinout příběh a já ti odpovím číslem, jestli mi rozumíš, napiš "Vymysli námět..." ať ti mohu zadat námět.';
const constPrompt = ', pokračuj v rozvíjení příběhu a dej další možnosti';

sendPrompt(openPrompt, name).then(result => {
    console.log(result);
    main();
});

function main() {
    rl.question('', (varPrompt) => {
        const prompt = varPrompt + constPrompt;
        sendPrompt(prompt, name).then(result => {
            console.log(result);
            main();
        });
    });
}  