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
    <div class="output">
    {output}
    </div>
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
                <button class="btnlogin button is-rounded is-8 is-medium"on:click={() => tryLogin()}>Log In</button>
        </div>
    </div>
</div>

<style>

    .output{
        text-align: center;
        font-family:"Roboto",sans-serif;
        font-weight:10%;
        color: hsl(141, 53%, 53%);
        text-decoration-line: black;
        user-select: none;
    }
    h2{ 
        text-align:center;
        font-size: 300%;
        font-family:"Roboto",sans-serif;
        font-weight: 300%;
        margin-top: 3rem;
        user-select: none;
    }

    .inputBox-pn{
        border-radius: 3rem;
        border-inline-color: #11bbaa;
        height:2rem;
        width:15rem;
        text-align: center;
        user-select: none;
    }
    
    .inputBox-n{
        border-radius: 3rem;
        border-inline-color: hsl(141, 53%, 53%);
        height:2rem;
        width:15rem;
        text-align: center;
        user-select: none;
    }
    .input-pn{
        margin:  0 0 3rem 0 ;
        user-select: none;
    }
    .input-n{
        position:relative;
        user-select: none;
    }
    .input-field{
        text-align: center;
        margin: 0.5rem 0 0 0;
        user-select: none;
    }
     .card {
        height:25rem;
        width:50%;
        margin-top: 8%;
        margin-left: 25%;
        margin-right:40%;
        margin-bottom:5%;
        border-radius: 2%;
        user-select: none;
    }
    .btnlogin{
        background-color:hsl(141, 53%, 53%);
        border-radius: 2em;
        height:2.5em;
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
        user-select: none;
    }
</style>