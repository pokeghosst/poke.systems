<script lang="ts">
    import { onDestroy } from 'svelte';

    let time = $state(new Date().toLocaleTimeString());

    const updateClock = () => {
        time = new Date().toLocaleTimeString()
    }

    const interval = setInterval(updateClock, 1000);

    onDestroy(() => {
        clearInterval(interval);
    })
</script>

<div class="clock">{time}</div>

<style>
    .clock {
        padding: 6px;
        border: 2px solid;
        border-color: var(--border-darker) var(--border-grey) var(--border-grey) var(--border-darker);
        cursor: default;
    }
</style>