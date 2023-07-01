import path from 'path';
import readline from "readline";
import { sendPrompt } from "./utils/request.mjs";

const name = path.basename(import.meta.url).slice(0, -4);
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const instructionSelectValue = 3;

main();

function main() {
    const instruction = switchInstruction(instructionSelectValue);

    rl.question('Text k překladu: ', (prompt) => {
        sendPrompt(prompt, name, instruction).then(result => {
            console.log(result);
            main();
        });
    });

    function switchInstruction(value) {
        switch(value) {
            case 1:
                return 'angličtiny';
            case 2:
                return 'němčiny';
            case 3: 
                return 'španělštny';   
        }
    }

}
