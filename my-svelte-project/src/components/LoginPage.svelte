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
        <h2>Login</h2>
        <div class="input-field">
            <p class="txt-personal-number">Personal Number:</p>
            <div class="input-pn">
                <input class="inputBox-pn" type="text" bind:value={persnum}>
           
            </div>
            <p class="txt-name">First- and Lastname:</p>
            <div class="input-n">
                <input class="inputBox-n" type="text" bind:value={user}>
               
            </div>
                <button class="btnlogin"on:click={() => tryLogin()}>Log In</button>
        </div>
    </div>
</div>

<style>

    h2{ 
        text-align:center;
        font-size: 45px;
        font-family:"Roboto",sans-serif;
        font-weight:300;
        margin-top: 3rem;
    }

    .inputBox-pn{
        border-radius: 3rem;
        border-inline-color: #11bbaa;
        height:2rem;
        width:15rem;
    }
    
    .inputBox-n{
        border-radius: 3rem;
        border-inline-color: hsl(141, 53%, 53%);
        height:2rem;
        width:15rem;
    }
    .input-pn{
        margin:  0 0 3rem 0 ;
    }
    .input-n{
        position:relative;
    }
    .input-field{
        text-align: center;
        margin: 0.5rem 0 0 0;
    }
     .card {
        height:25rem;
        margin-top: 10rem;
        margin-left: 40rem;
        margin-right:40rem;
        border-radius: 2rem;
    }
    .btnlogin{
        background-color:hsl(141, 53%, 53%);
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