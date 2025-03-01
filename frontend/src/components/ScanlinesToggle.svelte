<script lang="ts">
    import contrast from "../images/contrast.png"
    import {onMount} from "svelte";

    const scanlineContainer = document.getElementById("scanlineContainer")
    let scanlinesActive = (localStorage.getItem("scanlines") === "true")

    function onclick() {
        if (scanlineContainer) {
            scanlineContainer.classList.toggle("scanlines")
            localStorage.setItem("scanlines", (!scanlinesActive).toString())
        }
    }

    onMount(() => {
        if (!scanlinesActive && !!scanlineContainer) {
            console.log('removing scanlines...')
            scanlineContainer.classList.remove("scanlines")
        }
    })
</script>

<button class="button" {onclick}>
    <img alt="Scanlines toggle button" src={contrast.src} />
</button>

<style>
    .button {
        padding: 0;
        width: 37px;
    }

    img {
        width: 20px;
        height: 20px;
    }
</style>