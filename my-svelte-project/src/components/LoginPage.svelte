<script>
    import WeeklyFormular from "./WeeklyFormular.svelte";
    import LocalStorageApi from "../LocalStorageApi.js";

    let status = false;
    let persnum;
    let user;

    const setTrue = () => {
        status = true;
    }
</script>

<div>
    <div class="input-field">
        <input placeholder="Enter your personnel number" type="number" bind:value={persnum}>
        <input placeholder="Enter your first and lastname" type="text" bind:value={user}>
        <button on:click={() => LocalStorageApi.saveUser(user) && LocalStorageApi.saveNum(persnum)}>Log In</button>
    </div>
</div>