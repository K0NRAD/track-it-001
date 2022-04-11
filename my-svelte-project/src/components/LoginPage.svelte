<script>
    import WeeklyFormular from "./WeeklyFormular.svelte";

    let status = false;

    const setTrue = () => {
        status = true;
    }

    export let user;
    export let persnum;
</script>

<div>
    <div class="input-field">
        <input placeholder="Enter your personnel number" type="number" bind:value={persnum}>
        <input placeholder="Enter your first and lastname" type="text" bind:value={user}>
        <button on:click={() => setTrue()}>Log In</button>
    </div>
</div>