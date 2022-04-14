<script>
    import { onMount } from 'svelte';
    import LocalStorageApi from "../LocalStorageApi.js";
    import { timeRecordsStore } from "../store.js";
    let editedText;

    const CheckForLength = (text, operator) => {
        let check = 0;
        let char = 0;

        for(let i = 0; i < text.length; i++) {
            if(text[i] === operator) {
                check++;
            }
            if(check === 1 && text[i] !== operator){
                char++;
            }
            if(check ===  2 && char < 2) {
                editedText = text.substring(0, i-1) + "0" + text.substring(i-1, text.length);
                char = 0;
                check = 0;
            }
            if(check === 2 && char === 2) {
                editedText = text;
                char = 0;
                check = 0;
            }

        }
        if(editedText[editedText.length - 2] === operator){
            editedText = editedText.substring(0, editedText.length - 1) + "0" + editedText.substring(editedText.length - 1, editedText.length);
        }
    }


    let startWeek = "2022-4-11";
    let dayTwo = startWeek.substring(0, 8) + ( parseInt(startWeek.substring(8, startWeek.length)) + 1 );
    let dayThree = startWeek.substring(0, 8) + ( parseInt(startWeek.substring(8, startWeek.length)) + 2 );
    let dayFour = startWeek.substring(0, 8) + ( parseInt(startWeek.substring(8, startWeek.length)) + 3 );
    let endWeek = "2022-4-15";
    let EntryDay;
    let EntryStartTime;
    let EntryEndTime;
    let EntryWorkTime;
    let EntryBreakTime;
    let breakTimeStart;
    let breakTimeEnd;
    let timestamps = [];
    let timeRecords;

    
    timeRecords = $timeRecordsStore.filter(t=>t.date.substring(0, 9) !== startWeek || t.date.substring(0, 9) !== dayTwo || t.date.substring(0, 9) !== dayThree || t.date.substring(0, 9) !== dayFour || t.date.substring(0, 9) !== endWeek);
    

    try {
        for(let j = 0; j < timeRecords.length; j = j + 4){
            let timeRecord = [
                timeRecords[j],
                timeRecords[j+1],
                timeRecords[j+2],
                timeRecords[j+3]
            ];
            console.log(timeRecord);

            for(let i = 0; i < 4; i++) {
                if(i === 0) {
                    CheckForLength(timeRecord[i].date.substring(0, 10), "-");
                    EntryDay = editedText.substring(0, 10);
                    CheckForLength(timeRecord[i].date.substring(10, 18), ":")
                    console.log(timeRecord[i].date.substring(10, 18));
                    EntryStartTime = editedText.substring(0, 8);
                } else if(i === 1) {
                    CheckForLength(timeRecord[i].date.substring(10, 18), ":")
                    breakTimeStart = editedText.substring(0, 8);
                } else if(i === 2) {
                    CheckForLength(timeRecord[i].date.substring(10, 18), ":")
                    breakTimeEnd = editedText.substring(0, 8);
                    CheckForLength(parseInt(breakTimeEnd.substring(0, 2)) - parseInt(breakTimeStart.substring(0, 2)) + ":" + (parseInt(breakTimeEnd.substring(4, 6)) - parseInt(breakTimeStart.substring(4, 6))) + ":" + (parseInt(breakTimeEnd.substring(6, 8)) - parseInt(breakTimeStart.substring(6, 8))), ":");
                    EntryBreakTime = editedText;
                }
                else if(i === 3) {
                    CheckForLength(timeRecord[i].date.substring(10, 18), ":")
                    EntryEndTime = editedText.substring(0, 8);
                    CheckForLength(((parseInt(EntryEndTime.substring(0, 2)) - parseInt(EntryStartTime.substring(0, 2))) - (parseInt(breakTimeEnd.substring(0, 2)) - parseInt(breakTimeStart.substring(0, 2)))) + ":" + ((parseInt(EntryEndTime.substring(4, 6)) - parseInt(EntryStartTime.substring(4, 6))) - (parseInt(breakTimeEnd.substring(4, 6)) - parseInt(breakTimeStart.substring(4, 6)))) + ":" + ((parseInt(EntryEndTime.substring(6, 8)) - parseInt(EntryStartTime.substring(6, 8))) - (parseInt(breakTimeEnd.substring(6, 8)) - parseInt(breakTimeStart.substring(6, 8)))), ":");
                    EntryWorkTime = editedText;
                }
            }
            timestamps = [
                ...timestamps,
                {date: EntryDay, start: EntryStartTime, end: EntryEndTime, workTime: EntryWorkTime, break: EntryBreakTime}
            ];
        }
    } catch {
        timestamps = [];
    }  
    console.log(timestamps);

    let timeOutput = "";
    let user;
    let persnum;

    onMount(async () => {
        console.log(timeRecords);
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
            <div class="dropdown">
                <input class="select-kw" type="week" name="kw">
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
            <tfoot class="theadA">
                <tr>
                    <th class="tf">YYYY-MM-DD</th>
                    <th class="tf">HH-MM-SS</th>
                    <th class="tf">HH-MM-SS</th>
                    <th class="tf">HH-MM-SS</th>
                    <th class="tf">HH-MM-SS</th>
                </tr>
            </tfoot>
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
            <!-- svelte-ignore missing-declaration -->
            <button class="btnprint button is-rounded is-8 is-medium" on:click={() => print()}>Drucken</button>
            <div class="place"></div>
    </div>
</div>

<style>

    .time {
        font-size: 2rem;
        font-weight: bold;
        color:black;
        margin-top: 1rem;
        margin-left: 14.5%;
        user-select: none;
    }

    .dropdown{
        align-self: center;
        align-items: center;
        margin-top: 2%;
        float: center;
        width: 100%;
        height: 5%;
    }

    .select-kw{
        margin: 0 0 6% 33%;
        font-family:"Roboto",sans-serif;
        font-weight:300;
        font-size: 110%;
        text-align: left;
        border-style: none;
        float: center;
        width: 18%;
    }

    .name {
        text-align: left;
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
        user-select: none;
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
        user-select: none;
    }

    th {
        border-style: none;
        margin: 20px;
        text-align: center;
        user-select: none;
    }



    .btnprint {
        background-color: #9611bb;
        border-radius: 2em;
        height:2.5em;
        width: 8em;
        margin: 2rem 0 0 0;
        margin-top: 2rem;
        margin-left: 77.5%;
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
        user-select: none;
    }
</style>