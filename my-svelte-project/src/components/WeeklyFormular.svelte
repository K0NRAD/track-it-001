<script>
    import { onMount } from "svelte";
    import LocalStorageApi from "../LocalStorageApi.js";
    import { timeRecordsStore } from "../store.js";
    import { scale } from "svelte/transition";

    let editedText;

    const CheckForLength = (text, operator) => {
        let check = 0;
        let char = 0;

        for (let i = 0; i < text.length; i++) {
            if (text[i] === operator) {
                check++;
            }
            if (check === 1 && text[i] !== operator) {
                char++;
            }
            if (check === 2 && char < 2) {
                editedText =
                    text.substring(0, i - 1) +
                    "0" +
                    text.substring(i - 1, text.length);
                char = 0;
                check = 0;
            }
            if (check === 2 && char === 2) {
                editedText = text;
                char = 0;
                check = 0;
            }
        }
        if (editedText[editedText.length - 2] === operator) {
            editedText =
                editedText.substring(0, editedText.length - 1) +
                "0" +
                editedText.substring(editedText.length - 1, editedText.length);
        }
        if (parseInt(editedText.substring(0, 2)) < 10) {
            editedText = "0" + editedText;
        }
    };

    let startWeek;
    let EntryDay;
    let EntryStartTime;
    let EntryEndTime;
    let EntryWorkTime;
    let EntryBreakTime;
    let breakTimeStart;
    let breakTimeEnd;
    let timestamps = [];
    let timeRecord;
    let timeRecords;
    let weekDays;
    let allDays;

    const getAllDays = () => {
        let weekDaysString = weekDays.toString();
        weekDaysString = parseInt(weekDaysString.substring(6, 8)) + 1;
        let weekDay = weekDays.substring(0, 6) + weekDaysString;
        allDays = parseDates(weekDay);
        for (let i = 0; i < allDays.length; i++) {
            let day = allDays[i].toString().substring(8, 10);
            let monthAsString = allDays[i].toString().substring(4, 7);
            let year = weekDays.substring(0, 4);
            let month;
            switch (monthAsString) {
                case "Jan":
                    month = "1";
                    break;
                case "Feb":
                    month = "2";
                    break;
                case "Mar":
                    month = "3";
                    break;
                case "Apr":
                    month = "4";
                    break;
                case "May":
                    month = "5";
                    break;
                case "Jun":
                    month = "6";
                    break;
                case "Jul":
                    month = "7";
                    break;
                case "Aug":
                    month = "8";
                    break;
                case "Sep":
                    month = "9";
                    break;
                case "Oct":
                    month = "10";
                    break;
                case "Nov":
                    month = "11";
                    break;
                case "Dec":
                    month = "12";
                    break;
                default:
                    month = "";
                    break;
            }
            allDays[i] = year + "-" + month + "-" + day;
        }
        return allDays;
    };

    const onStart = () => {
        let days = getAllDays();
        let timeRecords = $timeRecordsStore.filter(
            (t) => t.date.substring(0, 9) !== startWeek
        );
        timestamps = [];
        let validTimeRecords = [];
        for (let k = 0; k < days.length; k++) {
            for (let h = 0; h < timeRecords.length; h++) {
                CheckForLength(timeRecords[h].date.substring(0, 9), "-");
                let checkDate = editedText;
                CheckForLength(days[k], "-");
                let formatedDate = editedText;
                if (formatedDate === checkDate) {
                    validTimeRecords = [...validTimeRecords, timeRecords[h]];
                }
            }
        }
        // console.log(timeRecords);
        //console.log(validTimeRecords);

        for (let j = 0; j < validTimeRecords.length; j = j + 4) {
            timeRecord = [
                validTimeRecords[j],
                validTimeRecords[j + 1],
                validTimeRecords[j + 2],
                validTimeRecords[j + 3],
            ];
            console.log(timeRecord);

            for (let i = 0; i < 4; i++) {
                if (i === 0) {
                    CheckForLength(timeRecord[i].date.substring(0, 10), "-");
                    EntryDay = editedText.substring(0, 10);
                    CheckForLength(timeRecord[i].date.substring(10, 18), ":");
                    EntryStartTime = editedText.substring(0, 8);
                } else if (i === 1) {
                    CheckForLength(timeRecord[i].date.substring(10, 18), ":");
                    breakTimeStart = editedText.substring(0, 8);
                } else if (i === 2) {
                    CheckForLength(timeRecord[i].date.substring(10, 18), ":");
                    breakTimeEnd = editedText.substring(0, 8);
                    CheckForLength(
                        parseInt(breakTimeEnd.substring(0, 2)) -
                            parseInt(breakTimeStart.substring(0, 2)) +
                            ":" +
                            (parseInt(breakTimeEnd.substring(4, 6)) -
                                parseInt(breakTimeStart.substring(4, 6))) +
                            ":" +
                            (parseInt(breakTimeEnd.substring(6, 8)) -
                                parseInt(breakTimeStart.substring(6, 8))),
                        ":"
                    );
                    EntryBreakTime = editedText;
                } else if (i === 3) {
                    CheckForLength(timeRecord[i].date.substring(10, 18), ":");
                    EntryEndTime = editedText.substring(0, 8);
                    CheckForLength(
                        parseInt(EntryEndTime.substring(0, 2)) -
                            parseInt(EntryStartTime.substring(0, 2)) -
                            (parseInt(breakTimeEnd.substring(0, 2)) -
                                parseInt(breakTimeStart.substring(0, 2))) +
                            ":" +
                            (parseInt(EntryEndTime.substring(4, 6)) -
                                parseInt(EntryStartTime.substring(4, 6)) -
                                (parseInt(breakTimeEnd.substring(4, 6)) -
                                    parseInt(breakTimeStart.substring(4, 6)))) +
                            ":" +
                            (parseInt(EntryEndTime.substring(6, 8)) -
                                parseInt(EntryStartTime.substring(6, 8)) -
                                (parseInt(breakTimeEnd.substring(6, 8)) -
                                    parseInt(breakTimeStart.substring(6, 8)))),
                        ":"
                    );
                    EntryWorkTime = editedText;
                }
            }
            timestamps = [
                ...timestamps,
                {
                    date: EntryDay,
                    start: EntryStartTime,
                    end: EntryEndTime,
                    workTime: EntryWorkTime,
                    break: EntryBreakTime,
                },
            ];
        }
    };

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
            if (time.getHours() < 10 && time.getMinutes() < 10)
                timeOutput =
                    "0" + time.getHours() + ":" + "0" + time.getMinutes();
            else if (time.getMinutes() === 0)
                timeOutput = time.getHours() + ":" + "00";
            else if (time.getHours() < 10)
                timeOutput = "0" + time.getHours() + ":" + time.getMinutes();
            else if (time.getMinutes() < 10)
                timeOutput = time.getHours() + ":" + "0" + time.getMinutes();
            else timeOutput = time.getHours() + ":" + time.getMinutes();
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    });

    let parseDates = (inp) => {
        let year = parseInt(inp.slice(0, 4), 10);
        let week = parseInt(inp.slice(6), 10);
        let day = 1 + (week - 1) * 7; // 1st of January + 7 days for each week
        let dayOffset = new Date(year, 0, 1).getDay(); // we need to know at what day of the week the year start

        dayOffset--; // depending on what day you want the week to start increment or decrement this value. This should make the week start on a monday

        let days = [];

        for (
            let i = 0;
            i < 7;
            i++ // do this 7 times, once for every day
        )
            days.push(new Date(year, 0, day - dayOffset + i)); // add a new Date object to the array with an offset of i days relative to the first day of the week
        return days;
    };
</script>

<div>
    <div in:scale ={{ duration: 1000 }}>
        <div class="card">
            <div class="place" />
            <div class="time">
                {timeOutput}
            </div>
            <div class="container">
                <img
                    class="profile-image"
                    src="./images/Profile.png"
                    alt="profilepic"
                />
                <div class="name">
                    {user}
                </div>
                <div class="id">
                    {persnum}
                </div>
                <div class="dropdowns">
                    <input
                        class="select-dateBegin"
                        type="week"
                        name="dateBegin"
                        bind:value={weekDays}
                        on:input={() => onStart()}
                    />
                </div>
            </div>
        </div>
    </div>
    <div class="place" />
    <div in:scale ={{ duration: 1000 }}>
        <div class="card">
            <div class="place" />
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
            <button
                class="btnprint button is-rounded is-8 is-medium"
                on:click={() => print()}>Drucken</button
            >
            <div class="place" />
        </div>
    </div>
</div>

<style>
    .time {
        font-size: 2rem;
        font-weight: bold;
        color: black;
        margin-top: 1rem;
        margin-left: 14.5%;
        user-select: none;
    }

    .dropdowns {
        align-self: center;
        align-items: center;
        margin-top: 2%;
        float: center;
        width: 100%;
        height: 5%;
    }
    .name {
        text-align: left;
        margin: 5% 0 1% 0;
        font-family: "Roboto", sans-serif;
        font-weight: 300;
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
        color: rgb(57, 57, 57);
        text-align: center;
        width: 80%;
    }

    .tableA {
        height: 50px;
        width: 80%;
        border: collapse;
        font-family: "Roboto", sans-serif;
        font-weight: 300;
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
        height: 2.5em;
        width: 8em;
        margin: 2rem 0 0 0;
        margin-top: 2rem;
        margin-left: 77.5%;
        box-sizing: border-box;
        display: inline-block;
        padding: 0.2em 1.2em;
        text-decoration: none;
        font-family: "Roboto", sans-serif;
        font-weight: 300;
        color: #ffffff;
        text-shadow: 0 0.04em 0.04em;
        text-align: center;
        transition: all 0.2s;
        align-items: left;
        user-select: none;
    }
</style>
