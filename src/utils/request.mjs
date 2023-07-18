import fs from 'fs';
import { Configuration, OpenAIApi } from "openai";
import data from "../config/request.json" assert {type: 'json'}

const configuration = new Configuration({apiKey: process.env.OPENAI_API_KEY,});
const openai = new OpenAIApi(configuration);

let context = [];

export async function sendPrompt(prompt, name, instruction = '') {
  const config = data.find(item => item.name === name);
  switch (config.completion) {
  case "text":
    if(config.constPrompt) prompt = config.constPrompt + instruction + prompt; 
    await openai.createCompletion({
      "prompt": prompt,
      "model": config.model,
      "max_tokens": config.max_tokens,
      "temperature": config.temperature,
    }).then( response => {
      return response.data.choices[0].text;
    });
  case "chat":
    context.push({ 'role': 'user', 'content': prompt });  
    await openai.createChatCompletion({
      "model": config.model,
      "messages": context,
      "temperature": config.temperature
    }).then( response => {
      context.push(response.data.choices[0].message);
      return response.data.choices[0].message.content;
    });
  case "edit":
    await openai.createEdit({
      "model": config.model,
      "input": prompt,
      "instruction": config.constInstruction + instruction,
    }).then( response => {
      return response.data;
    });
  case "image":
    await openai.createImage({
      "prompt": prompt,
      "n": config.n,
      "size": config.size
    }).then( response => {
      return response.data;
    });   
  // case "image-edit":
  //   await openai.createImageEdit(
  //     fs.createReadStream("files/*.png"),
  //     fs.createReadStream("files/*.png"),
  //     prompt,
  //     config.n,
  //     config.size
  //   ).then( response => {
  //     return response.data;
  //   });
  }
}