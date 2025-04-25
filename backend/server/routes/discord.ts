import discord from "../../lib/discord";

export default defineEventHandler(async (event) => {
  const eventStream = createEventStream(event);

  const user = await discord.users.fetch(useRuntimeConfig().discordUserId);
  const guild = await discord.guilds.fetch(useRuntimeConfig().discordGuildId);
  const member = await guild.members.fetch(user);

  eventStream.push(
    JSON.stringify({
      status: member?.presence?.status ?? "offline",
      activities: member?.presence?.activities,
    })
  );

  discord.on("presenceUpdate", (_, newPresence) => {
    eventStream.push(
      JSON.stringify({
        status: newPresence.status ?? "offline",
        activities: newPresence.activities,
      })
    );
  });

  eventStream.onClosed(async () => {
    await eventStream.close();
  });

  return eventStream.send();
});
