<script>
    import Clock from "./Clock.svelte";
    import {timeRecordsStore} from "../store.js";
    import LocalStorageApi from "../LocalStorageApi.js";
    import {onMount} from "svelte";

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
        let timeOutput = time.getUTCFullYear() + "-" + month + "-" + time.getUTCDate() + "/" + time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
        $timeRecordsStore = [...$timeRecordsStore, { date: timeOutput, type: type }];
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
    
<div>
    <div class="card">
        <div class="place"></div>
        <div class="time">
            <Clock/>
        </div>
            <div class="container">
                <img class="profile-image" src="./images/Profile.png" alt="User" />
                <div class="name">
                    {userName}
                </div>
                <div class="id">
                    {userID}
                </div>     
            </div>    
    </div>
    <div class="place"></div>  
    <div class="card">
            <div class="place"></div>
            <div class="columns">
                <span class="columnLeft column is-one-third ml-2">Arbeitsbeginn</span>
                <span class="columnLine1 column subtitle">{startWorkDate}</span>
                <span class="columnLine column subtitle has-text-right mr-2">{startWorkTime}</span>
            </div>
            <div class="columns">
                <span class="columnLeft column ml-2">Arbeitszeit</span>
                <span class="column title is-4 mr-2 has-text-right">{secondsToTime(secondsWorktime)}</span>    
            </div>  
            <div class="columns">
                <span class="columnLeft column ml-2">Pause</span>   
                <span class="column is-4 mr-2 has-text-right title is-3">{secondsToMinutes(secondsPause)}</span>
            </div>
            <div class="columns">
                <div class="column">
                    <button class="btnKommen button is-primary is-rounded is-8 is-medium"
                            disabled={comeButtonDisabled}
                            on:click={onClickCome}>Kommen</button>
                    </div>   
                    <div class="column">
                    <button class="btnPause button is-warning is-rounded is-8 has-text-black is-medium"
                            disabled={pauseButtonDisabled}
                            on:click={onClickPause}>Pause</button>
                    </div>
                    <div class="column">
                    <button class="btnGehen button is-danger is-rounded is-8 is-medium"
                            disabled={goButtonDisabled}
                            on:click={onClickGo}>Gehen</button>
                    </div>
             </div>
    </div>
</div>
<style>

    .columnLine1{
        font-weight: bold;
        border: none;
        margin-left: 12%;
    }

    .columnLine{
        font-weight: bold;
        border: none;
    }

    .columnLeft{
        font-family:"Roboto",sans-serif;
        font-weight: bold;
        font-size: 130%;
        color:rgb(57, 57, 57);

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
    .place {
        height: 2rem;
        width: 100%;
    }
    .btnKommen{
        margin-left:40%;
        width:40%;
        font-family:"Roboto",sans-serif;
    }

    .btnPause{
        margin-left:30%;
        width:40%;
        font-family:"Roboto",sans-serif;
    }

    .btnGehen{
        margin-left:20%;
        width:40%;
        font-family:"Roboto",sans-serif;
    }
    .time{
        font-size: 2rem;
        font-weight: bold;
        color:black;
        margin-top: 1rem;
        margin-left: 14.5%;
        user-select: none;
    }
    .card {
        margin: 0 5% 0 5%;
        border-radius: 2rem;
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

    .profile-image {
        border-radius: 50%;
        height: 60% / width;
        width: 11.5%;
        margin: 3% 0 0 7%;
    }


</style>