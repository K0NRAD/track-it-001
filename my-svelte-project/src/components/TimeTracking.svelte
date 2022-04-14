<script>
    import Clock from "./Clock.svelte";
    import { timeRecordsStore } from "../store.js";
    import LocalStorageApi from "../LocalStorageApi.js";
    import { onMount } from "svelte";
    import { scale } from "svelte/transition";

    let userID;
    let userName;
    let startWorkTime = "HH:MM";
    let startWorkDate = "TT.MM.JJJJ";
    let isPauseActive = false;
    let secondsWorktime = 0;
    let secondsPause = 0;
    let interval = null;
    let comeButtonDisabled = false;
    let pauseButtonDisabled = true;
    let goButtonDisabled = true;

    onMount(async () => {
        userName = await LocalStorageApi.loadUser();
        userID = await LocalStorageApi.loadNum();
    });

    const addTimeRecord = (type) => {
        let time = new Date();
        let month = time.getMonth() + 1;
        let timeOutput =
            time.getUTCFullYear() +
            "-" +
            month +
            "-" +
            time.getUTCDate() +
            "/" +
            time.getHours() +
            ":" +
            time.getMinutes() +
            ":" +
            time.getSeconds();
        $timeRecordsStore = [
            ...$timeRecordsStore,
            { date: timeOutput, type: type },
        ];
    };

    const startTimer = () => {
        return setInterval(() => {
            if (isPauseActive) {
                secondsPause++;
            } else {
                secondsWorktime++;
            }
        }, 1000);
    };

    const onClickPause = () => {
        if (isPauseActive) {
            addTimeRecord("P25");
            goButtonDisabled = false;
        } else {
            addTimeRecord("P15");
            goButtonDisabled = true;
        }
        isPauseActive = !isPauseActive;
    };

    const onClickGo = () => {
        clearInterval(interval);
        secondsPause = 0;
        secondsWorktime = 0;
        addTimeRecord("P20");
        goButtonDisabled = true;
        pauseButtonDisabled = true;
        comeButtonDisabled = false;
        startWorkTime = "HH:MM";
        startWorkDate = "TT.MM.JJJJ";
    };

    const onClickCome = () => {
        let time = new Date();
        startWorkTime = time.getHours() + ":" + time.getMinutes();
        startWorkDate =
            time.getDate() + "." + time.getMonth() + "." + time.getFullYear();

        addTimeRecord("P10");
        interval = startTimer();
        comeButtonDisabled = true;
        pauseButtonDisabled = false;
        goButtonDisabled = false;
    };

    const secondsToMinutes = (seconds) => {
        return Math.floor(seconds / 60) + " Minuten";
    };

    const secondsToTime = (seconds) => {
        let _seconds = seconds % 60;
        let _minutes = Math.floor(seconds / 60);
        let _hours = Math.floor(_minutes / 60);
        _minutes = _minutes % 60;
        return `${pad(_hours, 2)}:${pad(_minutes, 2)}:${pad(_seconds, 2)}`;
    };

    const pad = (num, size) => {
        let s = "0000000000" + num;
        return s.substring(s.length - size);
    };
</script>

<div>
    <div in:scale ={{ duration: 1000 }}>
        <div class="card">
            <div class="place" />
            <div class="time">
                <Clock />
            </div>
            <div class="container">
                <img
                    class="profile-image"
                    src="./images/Profile.png"
                    alt="User"
                />
                <div class="name">
                    {userName}
                </div>
                <div class="id">
                    {userID}
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
                        <th class="tl">Arbeitsbeginn</th>
                        <td class="tc">{startWorkDate}</td>
                        <td class="tr">{startWorkTime}</td>
                    </tr>
                </thead>
                <tbody class="table-body">
                    <tr>
                        <th class="tl">Arbeitszeit</th>
                        <td class="tc" />
                        <td class="tr">{secondsToTime(secondsWorktime)}</td>
                    </tr>
                </tbody>
                <tfoot class="theadA">
                    <tr>
                        <th class="tl">Pause</th>
                        <td class="tc" />
                        <td class="tr">{secondsToMinutes(secondsPause)}</td>
                    </tr>
                </tfoot>
            </table>

            <table class="tableButtons">
                <tbody>
                    <tr>
                        <td
                            ><button
                                class="btnKommen button is-primary is-rounded is-8 is-medium"
                                disabled={comeButtonDisabled}
                                on:click={onClickCome}>Kommen</button
                            ></td
                        >
                        <td
                            ><button
                                class="btnPause button is-warning is-rounded is-8 has-text-black is-medium"
                                disabled={pauseButtonDisabled}
                                on:click={onClickPause}>Pause</button
                            ></td
                        >
                        <td
                            ><button
                                class="btnGehen button is-danger is-rounded is-8 is-medium"
                                disabled={goButtonDisabled}
                                on:click={onClickGo}>Gehen</button
                            ></td
                        >
                    </tr>
                    <div class="place" />
                </tbody>
            </table>
        </div>
    </div>
</div>

<style>
    .tableButtons {
        margin-top: 2rem;
        text-align: center;
        width: 88%;
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

    .tc {
        text-align: center;
        font-family: "Roboto", sans-serif;
        font-weight: 10;
    }
    .tr {
        text-align: right;
        font-family: "Roboto", sans-serif;
        font-weight: 10;
    }
    .tl {
        text-align: left;
        font-family: "Roboto", sans-serif;
    }
    th {
        border-style: none;
        margin: 20px;
        text-align: center;
        user-select: none;
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
        user-select: none;
        position: relative;
    }
    .place {
        height: 2rem;
        width: 100%;
        user-select: none;
    }
    .btnKommen {
        margin-left: 40%;
        width: 40%;
        font-family: "Roboto", sans-serif;
        user-select: none;
    }

    .btnPause {
        margin-left: 30%;
        width: 40%;
        font-family: "Roboto", sans-serif;
        user-select: none;
    }

    .btnGehen {
        margin-left: 20%;
        width: 40%;
        font-family: "Roboto", sans-serif;
        user-select: none;
    }
    .time {
        font-size: 2rem;
        font-weight: bold;
        color: black;
        margin-top: 1rem;
        margin-left: 14.5%;
        user-select: none;
    }
    .card {
        margin: 0 5% 0 5%;
        border-radius: 2rem;
        user-select: none;
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
        user-select: none;
    }

    .profile-image {
        border-radius: 50%;
        height: 60% / width;
        width: 11.5%;
        margin: 3% 0 0 7%;
        user-select: none;
    }
</style>
