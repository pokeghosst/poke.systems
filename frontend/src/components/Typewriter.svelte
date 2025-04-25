<script lang="ts">
  import { onMount } from "svelte";

  let {
    text = "Current whereabouts or activity unknown.",
    speed = 30,
    delay = 0,
  }: { text: string; speed: number; delay: number } = $props();

  let displayedText = $state("");
  let typingComplete = $state(false);

  onMount(() => {
    setTimeout(() => {
      let currentIndex = 0;

      const interval = setInterval(() => {
        if (currentIndex < text.length) {
          displayedText += text[currentIndex++];
        } else {
          typingComplete = true;
          clearInterval(interval);
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay);
  });
</script>

<p>
  <span class="typewriter {typingComplete ? 'complete' : ''}">
    {displayedText}{#if !typingComplete}<span class="cursor">▌</span>{/if}
  </span>
</p>

<style>
  .typewriter {
    display: inline-block;
  }

  .cursor {
    display: inline-block;
    animation: blink 0.7s step-end infinite;
  }

  .cursor {
    line-height: 16px;
  }

  @keyframes blink {
    from,
    to {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
  }
</style>
