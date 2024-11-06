import { createResource, Show } from "solid-js";

import "./SpotifyPlayer.css";

import music from "../images/music.png";

const fetchSong = async () => {
  const response = await fetch(import.meta.env.PUBLIC_BACKEND_URL + "/spotify");
  return response.json();
};

const SpotifyPlayer = () => {
  const [currentSong] = createResource(fetchSong);

  return (
    <Show when={currentSong()} fallback={<p>Loading...</p>}>
      <Show when={currentSong().isPlaying}>
        <div class="player">
          <img
            src={currentSong().artwork}
            alt={`${currentSong().name} album cover`}
          />
          <p>{currentSong().name}</p>
          <p>{currentSong().artist}</p>
        </div>
      </Show>
      <Show when={!currentSong().isPlaying}>
        <div class="player">
          <img src={music.src} alt="no music is playing" />
          <p>Silence...</p>
        </div>
      </Show>
    </Show>
  );
};

export default SpotifyPlayer;
