import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({apiKey: process.env.OPENAI_API_KEY,});
const openai = new OpenAIApi(configuration);

let context = [];

export class OpenAiRequest {

  async getText(prompt) {
    const model = 'text-davinci-003';
    const n = 1;
    const max_tokens = 500;
    const temperature = 0;

    try {
        const response = await openai.createCompletion({
            "prompt": prompt,
            "model": model,
            "n": n,
            "max_tokens": max_tokens,
            "temperature": temperature
        });
        return response.data.choices[0].text;
    } catch(err) {
        console.error(err);
        return null;
    }

  }

  async getChat(prompt) {
    const model = "gpt-3.5-turbo";

    try {
        context.push({ 'role': 'user', 'content': prompt });  
        const response = await openai.createChatCompletion({
          "model": model,
          "messages": context
        });
        context.push(response.data.choices[0].message);
        return response.data.choices[0].message.content;
    } catch(err) {
        console.error(err);
        return null;
    }

  }

  async getEdit(prompt) {
    const model = 'text-davinci-edit-001';

    try {
        const response = await openai.createEdit({
          "model": model,
          "input": prompt,
          "instruction": "Fix the spelling mistakes",
        });
        return response.data.choices[0].text;
    } catch(err) {
        console.error(err);
        return null;
    }
  }

}