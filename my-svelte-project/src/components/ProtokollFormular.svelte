<script>
        import { onMount } from "svelte";
        import LocalStorageApi from "../LocalStorageApi.js";

        let protokolls = [
        {date: "07.04.2022", time: "08:30", typ: "P10", designation: "Kommen", pic:""},
        {date: "07.04.2022", time: "12:00", typ: "P15", designation: "Beginn Pause", pic:""},
        {date: "07.04.2022", time: "13:00", typ: "P25", designation: "Ende Pause", pic:""},
        {date: "07.04.2022", time: "16:30", typ: "P20", designation: "Gehen", pic:""}
        ];


        let user;
        let persnum;
        let time = "";
        let editModus = false;

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

		return () => {
			clearInterval(interval);
		};
	});
   // <img src=https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXktw6DUv_3pFI96cPYwX1MmfoM-Hmy9Gn5zdn2xeOte_2DyPMQ_3Uk5eVtcU4dQL79e8&usqp=CAU/>

    
        const editClick = () => {
            editModus = true;
            
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
            <img class="profile-image" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png" alt="profile-img">
            <div class="name">
                    {user}
            </div>
            <div class="id">
                    {persnum}
            </div>
    </div>
        <div>
            <div class="dropdowns">
                    <input class="select-kw" type="week" id="week" name="kw">
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
                            <button on:click={() => editClick(edit.id)}>Edit</button>
                        </tr>
                    {/each}
                </tbody>
            </table>
            <div class="buttons">
                <!-- svelte-ignore missing-declaration -->
                <button class="btnprint"on:click={print(protokolls)}>Drucken</button>
            </div>
</div>
    
<style>

        .dropdowns{
            text-align: center;
            margin-left: 6rem;
            position: relative;
            display: inline-block;
        }
        .select-kw{
            margin: 2rem 6rem;
            font-family:"Roboto",sans-serif;
            font-weight:300;
            font-size: 20px;
            margin-bottom: 3rem;
            clear: both;
            text-align: left;
            border-style: none;
        }

        .select-dateBegin{
            margin: 2rem 6rem;
            font-family:"Roboto",sans-serif;
            font-weight:300;
            font-size: 20px;
            margin-bottom: 3rem;
            text-align: left;
            border-style: none;
        }

        .select-dateEnd{
            margin: 2rem 6rem;
            font-family:"Roboto",sans-serif;
            font-weight:300;
            font-size: 20px;
            margin-bottom: 3rem;
            text-align: left;
            border-style: none;
        }

        .time {
            font-size: 2rem;
            font-weight: bold;
            color:black;
            margin-top: 1rem;
            margin-left: 10.5rem;
            user-select: none;
        }
    
        .name{
            text-align: center;
            margin: 2rem 6rem 0 0;
            font-family:"Roboto",sans-serif;
            font-weight:300;
            font-size: 50px;
            user-select: none;
            float: right;
            width: 350px;
        }
    
        .id{
           margin: 3rem 19rem 0 0;
           font-size: 2rem;
           float: right;
           width: 200px;
        }
    
        .place {
            height: 2rem;
            width: 100%;
        }
    
        .container{
            width: 100%;
            height: 190px;
            border: none;
            float: center;
            user-select: none;
            margin-top: 1rem;
        }
    
        .profile-image{
            border-radius: 50%;
            height:150px;
            width:150px;
            margin-left: 8.5rem;
        }
    
        .card {
            margin: 0 20rem 0 20rem;
            border-radius: 2rem;
        }
    
        .theadA{
            margin-top: 2rem;
            font-weight: bold;
            font-size: 25px;
            color:rgb(57, 57, 57);
            text-align: center;
        }
    
        .tableA{
            height: 50px;
            width:60%;
            border: collapse;
            font-family:"Roboto",sans-serif;
            font-weight:300;
            font-size: 20px;
            color: rgb(94, 94, 94);
            font-style: bold;
            margin: 2rem auto 0 auto;
            text-align: center;
        }
    
        th{
        border: none;
        
        }
    
        .buttons{
            width: 40%;
            margin-left: 80%;
        }
    
        .btnprint{
            background-color: #9611bb;
            border-radius: 2em;
            height:4em;
            width: 12em;
            margin: 2rem;
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


  

   