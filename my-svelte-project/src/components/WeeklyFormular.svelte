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
            if(time.getHours < 10 && time.getMinutes < 10) timeOutput = "0" + time.getHours() + ":" + "0" + time.getMinutes();
            else if(time.getHours < 10) timeOutput = "0" + time.getHours() + ":" + time.getMinutes();
            else if(time.getMinutes < 10) timeOutput = time.getHours() + ":" + "0" + time.getMinutes();
            else timeOutput = "0" + time.getHours() + ":" + time.getMinutes();
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});

    //export {timestamps};
</script>

<div>
    <div class="time">
        {timeOutput}
    </div>
    <div class="card">
    <div class="card-image">
        <figure class="image is-1by1">
            <div class=container>
                <img class="pic" src="https://www.kindpng.com/picc/m/285-2855863_a-festival-celebrating-tractors-round-profile-picture-placeholder.png" alt="profilepic">
                <div class="usernum">
                    {persnum}
                </div>
                <div class="username">    
                    {user}
                </div>
            </div>
        </figure>
    </div>
    </div>
    <table class="table">
        <thead class="table-head">
            <tr>
                <th>Datum</th>
                <th>Arbeitsbeginn</th>
                <th>Arbeitsende</th>
                <th>Arbeitszeit</th>
                <th>Pause</th>
            </tr>
        </thead>
        <tbody class="table-body">
            {#each timestamps as timestamp}
                <tr>
                    <td class="column">{timestamp.date}</td>
                    <td class="column">{timestamp.start}</td>
                    <td class="column">{timestamp.end}</td>
                    <td class="column">{timestamp.workTime}</td>
                    <td class="column">{timestamp.break}</td>
                </tr>
            {/each}
        </tbody>
    </table>
    <button on:click={() => print()}>Drucken</button>
    <button on:click={() => close()}>Schließen</button>
</div>

<style>
    .table-head {
        font-size: 2rem;
        font-weight: 200;
        text-align: center;
    }
    .column {
        text-align: center;
    }
    .container {
        width: 100%;
        height: 200px;
    }
    .pic {
        margin-top: 15px;
        width: auto;
        height: 150px;
    }
    .time {
        font-size: 2rem;
        font-weight: bold;
        margin-left: 25px;
        margin-top: 5px;
        margin-bottom: 0;
    }
</style>



<!-- TODOS!

LAYOUT: 
farben formen etc
"container" bild -> personalnummer -> name

FUNKTIONALITÄT
anbindung an die app mit anderen pages
button schließen verknüpfen -->