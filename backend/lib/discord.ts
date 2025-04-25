import { Client, GatewayIntentBits } from "discord.js";

const client = new Client({
  intents: [GatewayIntentBits.GuildPresences, GatewayIntentBits.Guilds],
});

client.login(useRuntimeConfig().discordBotToken);

export default client;
