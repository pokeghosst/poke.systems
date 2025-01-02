<script lang="ts">
    import Xterm from './XTerm.svelte';
    import { XtermAddon } from "./XtermAddon.ts";
    import type {
        ITerminalOptions,
        ITerminalInitOnlyOptions,
        Terminal
    } from '@battlefieldduck/xterm-svelte';

    let terminal: Terminal;

    let options: ITerminalOptions & ITerminalInitOnlyOptions = {
        theme: {
            background: '#1b1b1b'
        }
    };

    async function onLoad() {
        console.log('Child component has loaded');

        // FitAddon Usage
        const fitAddon = new (await XtermAddon.FitAddon()).FitAddon();
        terminal.loadAddon(fitAddon);
        fitAddon.fit();

        terminal.write('poke@poke.systems:~$ ');
    }

    function onData(data: string) {
        console.log('onData()', data);
    }

    function onKey(data: { key: string; domEvent: KeyboardEvent }) {
        console.log('onKey()', data);
    }
</script>

<Xterm bind:terminal {options} {onLoad} {onData} {onKey} />