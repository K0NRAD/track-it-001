<script>
    import Clock from "./Clock.svelte";
    import {timeRecordsStore} from "../store";

    export let userID = "123456789";
    export let userName = "John Doe";
    let startWorkTime = "HH:MM";
    let startWorkDate = "TT.MM.JJJJ";
    let isPauseActive = false;
    let secondsWorktime = 0;
    let secondsPause = 0;
    let interval = null;
    let comeButtonDisabled = false;
    let pauseButtonDisabled = true;
    let goButtonDisabled = true;

    

    const addTimeRecord = (type) => {
        $timeRecordsStore = [...$timeRecordsStore, { date: new Date(), type: type }];
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

    const secondsToTime = (seconds) =>{
        let _seconds = seconds % 60;
        let _minutes = Math.floor(seconds / 60 );
        let _hours = Math.floor(_minutes / 60); 
        _minutes = _minutes % 60;
        return `${pad(_hours,2)}:${pad(_minutes,2)}:${pad(_seconds,2)}`;

    }

    const pad = (num, size) => {
        let s = "0000000000" + num;
        return s.substring(s.length-size);
    }
</script>

<div class="container">
    <div class="columns">
        <div class="column is-full ml-2">
            <Clock />
        </div>
    </div>
    <div class="columns">
        <div class="column is-one-fifth ml-2 c2">
            <figure class="image is-96x96">
                <img src="/person.png" alt="User" />
            </figure>
        </div>
        <span class="column c2">{userID}</span>
        <span class="column has-text-right mr-2 c2">{userName}</span>
    </div>
    <div class="columns">
        <span class="column is-one-third ml-2">Arbeitsbeginn</span>
        <span class="column subtitle">{startWorkDate}</span>
        <span class="column subtitle has-text-right mr-2">{startWorkTime}</span>
    </div>
    <div class="columns">
        <span class="column ml-2">Arbeitszeit</span>
        <span class="column title is-4 mr-2 has-text-right">{secondsToTime(secondsWorktime)}</span>
    </div>
    <div class="columns">
        <span class="column ml-2">Pause</span>
        <span class="column is-4 mr-2 has-text-right title is-3">{secondsToMinutes(secondsPause)}</span>
    </div>
    <div class="columns">
        <div class="column">
            <button
                class="button is-primary is-rounded is-fullwidth is-medium"
                disabled={comeButtonDisabled}
                on:click={onClickCome}>Kommen</button
            >
        </div>
        <div class="column">
            <button
                class="button is-warning is-rounded is-fullwidth has-text-black is-medium"
                disabled={pauseButtonDisabled}
                on:click={onClickPause}>Pause</button
            >
        </div>
        <div class="column">
            <button
                class="button is-danger is-rounded is-fullwidth is-medium"
                disabled={goButtonDisabled}
                on:click={onClickGo}>Gehen</button
            >
        </div>
    </div>
</div>

<style>
    .c2{
        margin-top: auto;        
    }
</style>
