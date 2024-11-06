import { Client, GatewayIntentBits } from "discord.js";

const client = new Client({
  intents: [GatewayIntentBits.GuildPresences, GatewayIntentBits.Guilds],
});
client.login(useRuntimeConfig().discordBotToken);
client.on("ready", () => {
  console.log(`Logged in as ${client.user?.tag}!`);
});

export default defineEventHandler(async () => {
  const user = await client.users.fetch(useRuntimeConfig().discordUserId);
  const guild = await client.guilds.fetch(useRuntimeConfig().discordGuildId);
  const member = await guild.members.fetch(user);

  return {
    status: member.presence.status,
    activities: member.presence.activities,
  };
});
