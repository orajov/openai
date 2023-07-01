import { Configuration, OpenAIApi } from "openai";
import data from "../config/request.json" assert {type: 'json'}

const configuration = new Configuration({apiKey: process.env.OPENAI_API_KEY,});
const openai = new OpenAIApi(configuration);

let context = [];

export async function sendPrompt(prompt, name, instruction = '') {
  const varInstruction = instruction;
  const config = data.find(item => item.name === name);

  switch (config.completion) {
  case "text":
    try {
      if(config.constPrompt) prompt = config.constPrompt + instruction + prompt; 
      const response = await openai.createCompletion({
        "prompt": prompt,
        "model": config.model,
        "max_tokens": config.max_tokens,
        "temperature": config.temperature,
      });
      return response.data.choices[0].text;
    } catch (textErr) {
      console.error('textError>' + textErr);
      return null;
    }
  case "chat":
    try {
      context.push({ 'role': 'user', 'content': prompt });  
      const response = await openai.createChatCompletion({
        "model": config.model,
        "messages": context,
        "temperature": config.temperature
      });
      context.push(response.data.choices[0].message);
      return response.data.choices[0].message.content;
    } catch (chatErr) {
      console.error('chatError>' + chatErr);
      return null;
    }
  case "edit":
      try {
        const response = await openai.createEdit({
          "model": config.model,
          "input": prompt,
          "instruction": config.constInstruction + varInstruction,
        });
        return response.data.choices[0].text;
      } catch (editErr) {
        console.error('editError>' + editErr);
        return null;
      }
  case "image":
      try {
          const response = await openai.createImage({
            "prompt": prompt,
            "n": config.n,
            "size": config.size
          });
          return response.data;
        } catch (editErr) {
          console.error('editError>' + editErr);
          return null;
        }
  }
}