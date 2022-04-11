<script>
    import WeeklyFormular from "./WeeklyFormular.svelte";
    import LocalStorageApi from "../LocalStorageApi.js";

    let status = false;
    let persnum;
    let user;
    let output = "";

    const setTrue = () => {
        status = true;
    }

    const tryLogin = () => {
        if(user !== "" && persnum !== null && user !== undefined && persnum !== undefined){
            LocalStorageApi.saveUser(user);
            LocalStorageApi.saveNum(persnum);
            output = "You are signed in now";
        }
    }
</script>

<div>
    {output}
    <div class="input-field">
        <input placeholder="Enter your personnel number" type="number" bind:value={persnum}>
        <input placeholder="Enter your first and lastname" type="text" bind:value={user}>
        <button on:click={() => tryLogin()}>Log In</button>
    </div>
</div>