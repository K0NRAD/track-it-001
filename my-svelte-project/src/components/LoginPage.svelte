<script>
    import LocalStorageApi from "../LocalStorageApi.js";

    let status = false;
    let persnum;
    let user;
    let output = "";

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
    <div class="card">
        <div class="input-field">
            <div class="place"></div>
            <div class="input-pn">
                <input class="input-num" placeholder="Enter your personal number" type="text" bind:value={persnum}>
            </div>
            <div class="input-n">
                <input class="input-name" placeholder="Enter your first and lastname" type="text" bind:value={user}>
            </div>
                <button class="btnlogin"on:click={() => tryLogin()}>Log In</button>
        </div>
    </div>
</div>

<style>

    .input-name {
        width: 10%;
        text-align: center;
    }
    .input-num {
        width: 10%;
        text-align: center;
    }
    .place {
        height: 2rem;
        width: 100%;
    }
    .input-pn{
        margin:  0 0 3rem 0 ;
    }
    .input-n{
        position:relative;
    }
    .input-field{
        text-align: center;
        margin: 15rem 0 0 0;
    }
     .card {
        height:20rem;
        margin-top: 10rem;
        border-radius: 2rem;
    }
    .btnlogin{
        background-color: #11bbaa;
        border-radius: 2em;
        height:4em;
        width: 12em;
        margin: 5rem 0 0 0;
        box-sizing: border-box;
        display:inline-block;
        padding:0.2em 1.2em;
        text-decoration:none;
        font-family:"Roboto",sans-serif;
        font-weight:300;
        color:#FFFFFF;
        text-shadow: 0 0.04em 0.04em ;
        text-align:center;
        transition: all 0.2s;
    }
</style>