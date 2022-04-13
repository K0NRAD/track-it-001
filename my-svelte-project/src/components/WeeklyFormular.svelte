<script>
    //import {timestamps} from "./Time.svelte";
    import { onMount } from 'svelte';
    import LocalStorageApi from "../LocalStorageApi.js";
    //import { user } from "../storage.js";
    //let name = "Test Manuel"; //später import
    //let usernumber = 123456789; //später import

    let timestamps = [                  //später import
        {date: "01-01-2022", start: "7:00", end: "16:00", workTime: 8, break: 1},
        {date: "02-01-2022", start: "7:00", end: "15:30", workTime: 8, break: 0.5}
    ];

    let timeOutput = "";
    let user;
    let persnum;

    onMount(async () => {
		user = await LocalStorageApi.loadUser();
        persnum = await LocalStorageApi.loadNum();
	});

    onMount(() => {
		const interval = setInterval(() => {
			let time = new Date();
            if(time.getHours() < 10 && time.getMinutes() < 10) timeOutput = "0" + time.getHours() + ":" + "0" + time.getMinutes();
            else if (time.getMinutes() === 0) timeOutput = time.getHours() + ":" + "00";
            else if(time.getHours() < 10) timeOutput = "0" + time.getHours() + ":" + time.getMinutes();
            else if(time.getMinutes() < 10) timeOutput = time.getHours() + ":" + "0" + time.getMinutes();
            else timeOutput = time.getHours() + ":" + time.getMinutes();
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});

    //export {timestamps};
</script>

<div>
    <div class="card">
        <div class="place"></div>
        <div class="time">
            {timeOutput}
        </div>
        <div class="container">
            <img class="profile-image" src="./images/Profile.png" alt="profilepic">
            <div class="name">
                {user}
            </div>
            <div class="id">
                {persnum}
            </div>
        </div>
    </div>
    <div class="place"></div>
    <div class="card">
        <div class="place"></div>
        <table class="tableA">
            <thead class="theadA">
                <tr>
                    <th class="th">Datum</th>
                    <th class="th">Arbeitsbeginn</th>
                    <th class="th">Arbeitsende</th>
                    <th class="th">Arbeitszeit</th>
                    <th class="th">Pause</th>
                </tr>
            </thead>
            <tbody class="table-body">
                {#each timestamps as timestamp}
                    <tr>
                        <td>{timestamp.date} </td>
                        <td>{timestamp.start} </td>
                        <td>{timestamp.end} </td>
                        <td>{timestamp.workTime} </td>
                        <td>{timestamp.break} </td>
                    </tr>
                {/each}
            </tbody>
        </table>
        <div class="buttons">
            <!-- svelte-ignore missing-declaration -->
            <button class="btnprint" on:click={() => print()}>Drucken</button>
        </div>  
    </div>
</div>

<style>

    .time {
        font-size: 2rem;
        font-weight: bold;
        color:black;
        margin-top: 1rem;
        margin-left: 17%;
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
    }

    th {
        border-style: none;
        margin: 20px;
        text-align: center;
    }

    .buttons {
        width: 40%;
        margin-left: 80%;
    }

    .btnprint {
        background-color: #9611bb;
        border-radius: 2em;
        height:4em;
        width: 30%;
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