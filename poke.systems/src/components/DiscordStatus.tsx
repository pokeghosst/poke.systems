import { createResource, onMount, Show } from "solid-js";

import "./DiscordStatus.css";

const fetchStatus = async () => {
  const response = await fetch(import.meta.env.PUBLIC_BACKEND_URL + "/discord");
  return response.json();
};

const statuses = {
  online: "Online",
  idle: "Idle",
  dnd: "Do Not Disturb",
  offline: "Offline",
};

const DiscordStatus = () => {
  const [status] = createResource(fetchStatus);

  return (
    <Show when={status()} fallback={<p>Loading...</p>}>
      <Show when={status().status}>
        <p class="status">
          <span
            class="status-circle"
            classList={{
              green: status()?.status === "online",
              yellow: status()?.status === "idle",
              red: status()?.status === "dnd",
            }}
          ></span>
          <span>{statuses[status()?.status as keyof typeof statuses]}</span>
        </p>
      </Show>
      <Show when={!status().status}>
        <p class="offline">Offline</p>
      </Show>

      <Show when={status().activities && status().activities.length > 0}>
        <p>
          <em>
            {
              status()?.activities.find((activity: any) => activity.type === 4)
                ?.state
            }
          </em>
        </p>
      </Show>
      <Show when={!status().activities || status().activities.length === 0}>
        <p>
          <em>Internet ghost doing ghost things on the internet.</em>
        </p>
      </Show>
    </Show>
  );
};

export default DiscordStatus;
