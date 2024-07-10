import { config } from "dotenv";
import { Client, Routes, GatewayIntentBits } from "discord.js";
import { getConversation } from "./functionality/history.js";
import { getChat } from "./functionality/chat.js";
config();

const TOKEN = process.env.TOKEN;
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});



client.on("ready", () => {
  console.log(`Logged in `);
});
client.login(TOKEN);

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  const channels = ["1260674829133156392"];
  if (!channels.includes(message.channel.id) && !message.mentions.users.has(client.user.id)) return;

  await message.channel.sendTyping();
  const sendTypingInterval = setInterval(() => {
    message.channel.sendTyping();
  }, 5000);

  try {
    const conversation = await getConversation(message);
    await getChat(conversation, message, sendTypingInterval);
  } catch (error) {
    console.error("Error handling message:", error);
  }
});
