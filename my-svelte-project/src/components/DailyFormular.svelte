<script> 
    import { onMount } from "svelte";
    import LocalStorageApi from "../LocalStorageApi.js";
    import { timeRecordsStore } from "../store.js";
    import { scale } from "svelte/transition";

    let user;
    let persnum;
    let timerecords;
    let time = "";
    let editModus = false;
    let picture = EDITPICTURE_URI;
    let EntryType;
    let EntryDesignation;
    let timestamps = [];
    let timeRecord;
    let entryDay;
    let EntryStartTime;
    let startDay;
    let editedText;

    onMount(async () => {
        user = await LocalStorageApi.loadUser();
        persnum = await LocalStorageApi.loadNum();
    });

    const checkForLength = (text, seperator) => {
        let tokens = text.split(seperator);
        if (seperator === "-") {
            editedText = `${pad(parseInt(tokens[0]), 4)}-${pad(
                parseInt(tokens[1]),
                2
            )}-${pad(parseInt(tokens[2]), 2)}`;
        } else {
            editedText = `${pad(parseInt(tokens[0]), 2)}:${pad(
                parseInt(tokens[1]),
                2
            )}:${pad(parseInt(tokens[2]), 2)}`;
        }
        return editedText;
    };

    const pad = (num, size) => {
        num = num.toString();
        while (num.length < size) {
            num = "0" + num;
        }
        return num;
    };

    const onStart = () => {
        let timeRecords = $timeRecordsStore.filter(
            (t) => t.date.substring(0, 9) !== startDay
        );
        timestamps = [];
        let validTimeRecords = [];
        for (let i = 0; i < timeRecords.length; i++) {
            let checkDate = checkForLength(
                timeRecords[i].date.substring(0, 9),
                "-"
            );
            if (startDay === checkDate) {
                validTimeRecords = [...validTimeRecords, timeRecords[i]];
            }
        }
      
        for (let j = 0; j < validTimeRecords.length; j = j + 4) {
            timeRecord = [
                validTimeRecords[j], // P10
                validTimeRecords[j + 1],  //P15
                validTimeRecords[j + 2], //P25
                validTimeRecords[j + 3], //P20
            ];


           console.log(timeRecords);

    
                for (let i = 0; i < 4; i++) {
                            entryDay = checkForLength(
                                timeRecord[i].date.substring(0, 10),
                                "-"
                            ).substring(0, 10);
                            if(timeRecord[i].type === "P10") {
                            EntryType = timeRecord[i].type;
                            EntryDesignation = "Kommen";
                            EntryStartTime = checkForLength(
                                timeRecord[i].date.substring(10, 18),
                                ":"
                            ).substring(0, 8);
                        } else if(timeRecord[i].type === "P15"){
                            EntryType = timeRecord[i].type;
                            EntryDesignation = "Beginn Pause";
                            EntryStartTime = checkForLength(
                                timeRecord[i].date.substring(10, 18),
                                ":"
                            ).substring(0, 8);
                        } else if(timeRecord[i].type === "P25"){
                            EntryType = timeRecord[i].type;
                            EntryDesignation = "Ende Pause";
                            EntryStartTime = checkForLength(
                                timeRecord[i].date.substring(10, 18),
                                ":"
                            ).substring(0, 8);
                        } else if(timeRecord[i].type === "P20"){
                            EntryType = timeRecord[i].type;
                            EntryDesignation = "Gehen";
                            EntryStartTime = checkForLength(
                                timeRecord[i].date.substring(10, 18),
                                ":"
                            ).substring(0, 8);
                    }
                    timestamps = [
                        ...timestamps,
                        {
                            date: entryDay,
                            time: EntryStartTime,
                            typ: EntryType,
                            designation: EntryDesignation
                        },
                    ];
            }
        }
    };


    onMount(() => {
        const interval = setInterval(() => {
            let today = new Date();
            if (today.getHours() < 10 && today.getMinutes() < 10)
                time = "0" + today.getHours() + ":" + "0" + today.getMinutes();
            else if (today.getMinutes() === 0)
                time = today.getHours() + ":" + "00";
            else if (today.getHours() < 10)
                time = "0" + today.getHours() + ":" + today.getMinutes();
            else if (today.getMinutes() <10)
                time = today.getHours() + ":" + "0" + today.getMinutes();
            else time = today.getHours() + ":" + today.getMinutes();
        }, 1000);
    });

    const EDITPICTURE_URI = "./images/Edit.png";
    const SAVEPICTURE_URI = "./images/Save.png";



    const editClick = () => {
        if (editModus === false) {
            picture = SAVEPICTURE_URI;
            editModus = true;
        } else {
            saveEdits();
            picture = EDITPICTURE_URI;
            editModus = false;
        }
    };

    let TR;
    const saveEdits = () => {
        let table, tr, userVersion = [], i, j;
        table    = document.getElementById("mytable");
        tr       = table.getElementsByClassName("output"); //element
        TR = tr;
        //console.log(tr);
        for (i=0; i< tr.length; i = i + 4) {    
                    userVersion[tr[i].sectionRowIndex] = tr[i].getElementsByTagName("td")[3].innerHTML;
        }
        console.log(userVersion);
        localStorage.setItem('userEdits', JSON.stringify(userVersion));
    };

   const checkEdits = () => {
        try{
        let userEdits = localStorage.getItem("userEdits");

        console.log(JSON.parse(userEdits));

        if (userEdits) {
            userEdits = JSON.parse(userEdits);
            table    = document.getElementById("mytable");
            tr       = table.getElementsByClassName("output"); //element

            for ( var elementId in userEdits ) {
                    tr[elementId].getElementsByTagName("td")[3].innerHTML = userEdits[elementId];
            }
        }
        }catch{
        //console.log("Hello");
        }
    }


</script>

<div on:load={() =>checkEdits()}>
    <div in:scale={{ duration: 1000 }}>
            <div class="card">
                <div class="place" />
                <div class="time">
                    {time}
                </div>
                <div class="container">
                    <img
                        class="profile-image"
                        src="./images/Profile.png"
                        alt="profile-img"
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
                            type="date"
                            name="dateBegin"
                            bind:value={startDay}
                            on:input={() => onStart()}
                        />
                    </div>
                </div>
            </div>
        </div>
    <div class="place" />
    <div in:scale={{ duration: 1000 }}>
        <div class="card">
            <div class="place" />
            <table class="tableA" id="mytable">
                <thead class="theadA">
                    <tr>
                        <th class="th">Datum</th>
                        <th class="th">Zeit</th>
                        <th class="th">Typ</th>
                        <th class="th">Bezeichnung</th>
                        <th class="th" />
                    </tr>
                </thead>
                <tbody class="table-body">
                    {#each timestamps as timestamp}
                        <tr class="output">
                            <td contenteditable={editModus}>{timestamp.date}</td>
                            <td contenteditable={editModus}>{timestamp.time}</td>
                            <td contenteditable={editModus}>{timestamp.typ}</td>
                            <td contenteditable={editModus}>{timestamp.designation}</td>
                        </tr>
                    {/each}
                </tbody>
            </table>
            <button class="btnedit" on:click={() => editClick()}><img class="buttonImage" src={picture} alt="editImage" /></button>
            <!-- svelte-ignore missing-declaration -->
            <table class="tableButtons">
                <tbody>
                    <tr>
                        <td><button
                            class="btnprint button is-rounded is-8 is-medium"
                            on:click={() => print()}>Drucken</button>
                        </td>
                    </tr>                  
                    <tr>
                        <td><button
                            class="btnsend button is-rounded is-8 is-medium"
                            on:click={() => send()}>Senden</button>
                        </td>
                    </tr>
                    <div class="place" />
                </tbody>
            </table>
        </div>
    </div>
</div>

<style>
     .btnprint {
        background-color: #9611bb;
        border-radius: 2em;
        height: 2.5em;
        width: 8em;
        margin: 2rem 0 0 0;
        margin-top: 1rem;
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

    .btnsend {
        background-color: rgb(75, 194, 36);
        border-radius: 2em;
        height: 2.5em;
        width: 8em;
        margin: 2rem 0 0 0;
        margin-top: 1rem;
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
    .tableButtons {
        text-align: right;
        width: 88%;
    }
    .buttonImage {
        height: 3em;
        width: 30%;
    }
    .btnedit {
        margin-top: 2rem;
        margin-left: 80%;
        border: none;
        width: 10%;
        float: center;
        height: 4em;
        background-color: transparent;
    }

    .dropdowns {
        align-self: center;
        align-items: center;
        margin-top: 2%;
        margin-bottom: 10%;
        float: center;
        width: 100%;
        height: 5%;
    }
    .select-dateBegin {
        padding-left: 1rem;
        padding-right: 1rem;
        margin: 0 0 6% 33%;
        font-family: "Roboto", sans-serif;
        font-weight: 300;
        font-size: 110%;
        text-align: left;
        float: center;
        height: 180%;
        width: 20%;
        border: 10% solid;
        border-radius: 2rem;
    }

    .time {
        font-size: 2rem;
        font-weight: bold;
        color: black;
        margin-top: 1rem;
        margin-left: 14.5%;
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
    }
    .place {
        height: 2rem;
        width: 100%;
    }
    .container {
        align-self: center;
        align-items: center;
        width: 100%;
        height: 350px;
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
        color: rgb(57, 57, 57);
        text-align: center;
        width: 80%;
        user-select: none;
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
</style>
