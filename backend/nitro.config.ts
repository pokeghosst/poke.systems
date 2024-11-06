export default defineNitroConfig({
  srcDir: "server",
  compatibilityDate: "2024-11-05",
  runtimeConfig: {
    togglToken: "token",
    spotifyClientId: "client-id",
    spotifySecret: "secret",
    spotifyRefreshToken: "token",
    discordBotToken: "token",
    discordGuildId: "id",
    discordUserId: "id",
  },
  esbuild: {
    options: {
      target: "esnext",
    },
  },
  routeRules: {
    "/**": {
      cors: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "Origin, Content-Type, Accept, Authorization",
      },
    },
  },
});
