<script>
  import { onMount } from "svelte";

  let statusData = $state(null);

  let status = $derived(statusData?.status);
  let activities = $derived(statusData?.activities || []);
  let customStatus = $derived(
    activities.find((activity) => activity.type === 4)?.state,
  );

  onMount(async () => {
    const response = await fetch(
      import.meta.env.PUBLIC_BACKEND_URL + "/discord",
    );
    statusData = await response.json();
  });

  function getStatusClass(status) {
    switch (status) {
      case "online":
        return "green";
      case "idle":
        return "yellow";
      case "dnd":
        return "red";
      default:
        return "white";
    }
  }
</script>

<div class="discord-status">
  <p class="status">
    <span class={["status-circle", status ? getStatusClass(status) : "white"]}
    ></span>
    <span class="username">
      <strong>pokeghost</strong>
    </span>
  </p>

  {#if statusData}
    {#if activities.length > 0}
      <div class="status-message">
        <p>{customStatus}</p>
      </div>
    {:else}
      <div class="status-message">
        <p>Somewhere out there, doing something.</p>
      </div>
    {/if}
  {:else}
    <div class="status-message">
      <p>Please wait...<br />Consulting the spirits...</p>
    </div>
  {/if}
</div>

<style>
  .status {
    display: flex;
    gap: 1px;
  }

  .status-message {
    border: 2px solid var(--border-grey);
    padding: 10px;
    margin: 8px;
    font-style: italic;
    position: relative;
    min-height: 56px;
  }

  .status-message::before,
  .status-message::after {
    content: "";
    position: absolute;
    top: 28px;
    left: -18px;
  }

  .status-message::before {
    border-width: 8px;
    border-style: solid;
    border-color: transparent var(--border-grey) transparent transparent;
  }

  .status-message::after {
    border-width: 7px;
    border-style: solid;
    border-color: transparent var(--bg-color) transparent transparent;
    top: 29px;
    left: -14px;
  }

  .status-circle {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    margin: 9px;
    display: block;
    transition:
      background-color 1s cubic-bezier(0.4, 0, 0.2, 1),
      box-shadow 1.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .status-circle.white {
    background-color: #ffffff;
    box-shadow: 0 0 6px 2px #ffffff;
  }

  .status-circle.green {
    background-color: #00ff00;
    box-shadow: 0 0 6px 2px #00ff00;
  }

  .status-circle.yellow {
    background-color: #ffff00;
    box-shadow: 0 0 6px 2px #ffff00;
  }

  .status-circle.red {
    background-color: #ff0000;
    box-shadow: 0 0 6px 2px #ff0000;
  }

  .username {
    display: flex;
    align-items: center;
    gap: 2px;
  }

  @media screen and (max-width: 375px) {
    .status {
      justify-content: center;
    }

    .status-message::before,
    .status-message::after {
      top: -17px;
      left: 50%;
    }

    .status-message::before {
      border-color: transparent transparent var(--border-grey) transparent;
    }

    .status-message::after {
      border-color: transparent transparent var(--bg-color) transparent;
      top: -13px;
      left: 50.5%;
    }

    .status-message {
      margin: 18px 8px 0 8px;
    }
  }
</style>
