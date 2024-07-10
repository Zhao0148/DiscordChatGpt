import { OpenAI } from "openai";
import { config } from "dotenv";
config();
const OPENAIKEY = process.env.OPEN_AI;

const openai = new OpenAI({
  apiKey: OPENAIKEY,
});

export async function getChat(conversation, message, sendTypingInterval) {
  const response = await openai.chat.completions
    .create({
      model: "gpt-3.5-turbo",
      messages: conversation,
    })
    .catch((error) => {
      console.error("OpenAi Error:", error);
    });
  message.reply(response.choices[0].message.content).then(() => {
    clearInterval(sendTypingInterval);
  });

  if (!response) {
    message.reply("Open AI Error, I am unable to respond to that.");
    return;
  }

  const responseMessage = response.choices[0].message.content;
  const discordChunkSizeLimit = 2000;

  if (responseMessage.length >= discordChunkSizeLimit) {
    for (let i = 0; i < responseMessage.length; i += discordChunkSizeLimit) {
      const toSend = responseMessage.substring(i, i + discordChunkSizeLimit);
      message.reply(toSend);
    }
  }

  console.log(response.choices[0].message.content);
}
