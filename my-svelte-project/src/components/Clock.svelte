<script>
    import { onMount, onDestroy } from "svelte";

    let timeOutput = "";
    let interval;

    onMount(() => {
        interval = setInterval(() => {
            let time = new Date();
            timeOutput = pad(time.getHours(),2) + ":" + pad(time.getMinutes(),2);
        }, 1000);
    });

    onDestroy(() => {
        clearInterval(interval);
    });

    const pad = (num, size) => {
        let s = "0000000000" + num;
        return s.substring(s.length-size);
    }
</script>

<h1 class="title is-3">
    {timeOutput}
</h1>

<style>
</style>
