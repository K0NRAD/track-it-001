<script>
    import { onMount } from "svelte";
    import LocalStorageApi from "../LocalStorageApi.js";


    let protokolls = [
    {id: 1, date: "07.04.2022", time: "08:30", typ: "P10", designation: "Kommen", edit:""},
    {id: 2, date: "07.04.2022", time: "12:00", typ: "P15", designation: "Beginn Pause", edit:""},
    {id: 3, date: "07.04.2022", time: "13:00", typ: "P25", designation: "Ende Pause", edit:""},
    {id: 4, date: "07.04.2022", time: "16:30", typ: "P20", designation: "Gehen", edit:""}
    ];


    let user;
    let persnum;
    let time = "";
    let editModus = false;
    let picture=EDITPICTURE_URI;

    onMount(async () => {
    user = await LocalStorageApi.loadUser();
    persnum = await LocalStorageApi.loadNum();
    });


    onMount(() => {
        const interval = setInterval(() => {
            let today = new Date();
            if(today.getHours() < 10 && today.getMinutes < 10) time = "0" + today.getHours() + ":" + "0" + today.getMinutes();
            else if (today.getMinutes() === 0) time = today.getHours() + ":" + "00";
            else if(today.getHours() < 10) time = "0" + today.getHours() + ":" + today.getMinutes();
            else if(today.getMinutes() < 10) time = today.getHours() + ":" + "0" + today.getMinutes();
            else time = today.getHours() + ":" + today.getMinutes();
        }, 1000);
    });

    const EDITPICTURE_URI = "./images/Edit.png";
    const SAVEPICTURE_URI ="./images/Save.png";


    const saveClick = () => {
        if(editModus === false){
            picture=SAVEPICTURE_URI;
            editModus = true;
        }else{
            picture=EDITPICTURE_URI;
            editModus = false;
        }
        
    }

export {protokolls};
</script>

<div>
<div class="card">
    <div class="place"></div>
    <div class="time">
        {time}
    </div>
    <div class="container">
        <img class="profile-image" src="./images/Profile.png" alt="profile-img">
        <div class="name">
                {user}
        </div>
        <div class="id">
                {persnum}
        </div>
</div>
    <div>
        <div class="dropdowns">
                <input class="select-kw" type="week" name="kw">
                <input class="select-dateBegin" type="date" name="dateBegin">
                <input class="select-dateEnd" type="date" name="dateEnd">
              </div>
        </div>
    </div>
</div>
    <div class="place"></div>
    <div class="card">
        <div class="place"></div>
        <table class="tableA" id="productTable">
            <thead class="theadA">
                <tr>
                    <th>Datum</th>
                    <th>Zeit</th>
                    <th>Typ</th>
                    <th>Bezeichnung</th>
                    <th></th>
                </tr>
            </thead>
            <tbody class="table-body">
                {#each protokolls as protokoll}
                    <tr>
                        <td contenteditable={editModus}>{protokoll.date}</td>
                        <td contenteditable={editModus}>{protokoll.time}</td>
                        <td contenteditable={editModus}>{protokoll.typ}</td>
                        <td contenteditable={editModus}>{protokoll.designation}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
            <div class="borderBtnEdit">
            <button class="btnedit"on:click={() => saveClick()}><img class="buttonImage" src={picture} alt="saveimage"></button>
            </div>
            <!-- svelte-ignore missing-declaration -->
            <button class="btnprint button is-rounded is-8 is-medium"on:click={print(protokolls)}>Drucken</button>

</div>

<style>

.borderBtnEdit{
    align-items: left;
}
.btnprint {
    background-color: #9611bb;
    border-radius: 2em;
    height:2.5em;
    width: 12em;
    margin: 2rem 0 0 0;
    margin-top: 0.5rem;
    margin-bottom: 5%;
    margin-left: 60%;
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
    align-items: left;
}
.buttonImage {
    height: 4em;
    width: 100%;
}
.btnedit {
    border: none;
    width: 10%;
    float: center;
    height: 4em;
    background-color: transparent;
}
.dropdowns{
    align-self: center;
    align-items: center;
    margin-top: 2%;
    float: center;
    width: 100%;
    height: 5%;
}
.select-kw{
    margin: 0 0 3% 14%;
    font-family:"Roboto",sans-serif;
    font-weight:300;
    font-size: 110%;
    text-align: left;
    border-style: none;
    float: left;
    width: 22%;
}

.select-dateBegin{
    margin: 0 0 3% 10%;
    font-family:"Roboto",sans-serif;
    font-weight:300;
    font-size: 110%;
    text-align: left;
    border-style: none;
    float: center;
    width: 18%;
}

.select-dateEnd{
    margin: 0 15% 3% 0;
    font-family:"Roboto",sans-serif;
    font-weight:300;
    font-size: 110%;
    text-align: left;
    float: right;
    border-style: none;
    width: 18%;
}

.time {
    font-size: 2rem;
    font-weight: bold;
    color:black;
    margin-top: 1rem;
    margin-left: 14.5%;
    user-select: none;
}

.name {
    text-align: center;
    margin: 5% 0 1% 0;
    font-family:"Roboto",sans-serif;
    font-weight:300;
    font-size: 300%;
    user-select: none;
    float: right;
    width: 40%;
}
.id {
   margin: 6% 2% 0 0;
   font-size: 200%;
   float: right;
   width: 25%;
}
.place {
    height: 2rem;
    width: 100%;
}
.container {
    align-self: center;
    align-items: center;
    width: 100%;
    height: 250px;
    border: none;
    float: center;
    user-select: none;
    margin: 0 0 0 7%;
}
.profile-image {
    border-radius: 50%;
    height: 60% / width;
    width: 11.5%;
    margin: 3% 0 0 7%;
}
.card {
    margin: 0 5% 0 5%;
    border-radius: 2rem;
}
.theadA {
    margin-top: 2rem;
    font-weight: bold;
    font-size: 100%;
    color:rgb(57, 57, 57);
    text-align: center;
    width: 80%;
    user-select: none;
}
.tableA {
    height: 50px;
    width: 80%;
    border: collapse;
    font-family:"Roboto",sans-serif;
    font-weight:300;
    font-size: 125%;
    color: rgb(94, 94, 94);
    font-style: bold;
    margin: 2rem auto 0 auto;
    text-align: center;
    user-select: none;
}


</style>




