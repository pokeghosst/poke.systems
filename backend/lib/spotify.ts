let spotifyAccessToken = null;

function setSpotifyAccessToken(value: string) {
  spotifyAccessToken = value;
}

async function refreshAccessToken(refreshToken: string) {
  const url = "https://accounts.spotify.com/api/token";
  const payload = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(
          useRuntimeConfig().spotifyClientId +
            ":" +
            useRuntimeConfig().spotifySecret
        ).toString("base64"),
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  };

  const body = await fetch(url, payload);
  const response = await body.json();

  setSpotifyAccessToken(response);
}

export { setSpotifyAccessToken, refreshAccessToken, spotifyAccessToken };
