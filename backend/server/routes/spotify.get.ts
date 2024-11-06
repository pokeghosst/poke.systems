import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import type { Track } from "@spotify/web-api-ts-sdk";

import { refreshAccessToken, spotifyAccessToken } from "../../lib/spotify";

let spotify: SpotifyApi;

export default defineEventHandler(async () => {
  if (!spotify) {
    if (spotifyAccessToken) {
      if (spotifyAccessToken.expires - Date.now() <= 0) {
        await refreshAccessToken(useRuntimeConfig().spotifyRefreshToken);
      }

      spotify = SpotifyApi.withAccessToken(
        useRuntimeConfig().spotifyClientId,
        spotifyAccessToken
      );
    } else {
      await refreshAccessToken(useRuntimeConfig().spotifyRefreshToken);
      spotify = SpotifyApi.withAccessToken(
        useRuntimeConfig().spotifyClientId,
        spotifyAccessToken
      );
    }
  }

  const currentPlaying = await spotify.player.getPlaybackState();

  if (!currentPlaying.item) return {};

  return {
    artist: (currentPlaying.item as Track).artists[0].name,
    name: currentPlaying.item.name,
    artwork: (currentPlaying.item as Track).album.images[1].url,
    isPlaying: currentPlaying.is_playing,
  };
});
