<script>
        import { onMount } from "svelte";


        let name= "John Doe";
        let usernumber="123-456-789";
        let time = "";

        let protokolls = [
        {date: "07.04.2022", time: "08:30", typ: "P10", designation: "Kommen", pic:""},
        {date: "07.04.2022", time: "12:00", typ: "P15", designation: "Beginn Pause", pic:""},
        {date: "07.04.2022", time: "13:00", typ: "P25", designation: "Ende Pause", pic:""},
        {date: "07.04.2022", time: "16:30", typ: "P20", designation: "Gehen", pic:""}
        ];

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


        close(() => {
    
        });
        export {protokolls};
</script>

<div>
    <div class="container">
        <div class="time">
            {time}
        </div>
        <div class="image">
            <img class="profile-image" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png" alt="profile-img">
        </div>
        <div class="name">
            {name}
        </div>
        <div class="id">
            {usernumber}
        </div>
    <div>
        <div>
            <div class="selects">
                <div class="select-kw">
                    <select>
                      <option>KW 01</option>
                      <option>KW 02</option>
                      <option>KW 03</option>
                      <option>KW 04</option>
                      <option>KW 05</option>
                      <option>KW 06</option>
                      <option>KW 07</option>
                    </select>
                  </div>
                  <div class="select-dateBeginn">
                    <select>
                      <option>07.01.2022</option>
                      <option>08.01.2022</option>
                      <option>09.01.2022</option>
                      <option>10.01.2022</option>
                      <option>11.01.2022</option>
                      <option>12.01.2022</option>
                      <option>13.01.2022</option>
                    </select>
                  </div>
                  <div class="select-dateEnd">
                    <select>
                        <option>07.01.2022</option>
                        <option>08.01.2022</option>
                        <option>09.01.2022</option>
                        <option>10.01.2022</option>
                        <option>11.01.2022</option>
                        <option>12.01.2022</option>
                        <option>13.01.2022</option>
                    </select>
                  </div>
            </div>
        </div>
            <table class="tableA">
                <thead class="theadA">
                    <tr>
                        <th>Datum</th>
                        <th>Zeit</th>
                        <th>Typ</th>
                        <th>Bezeichnung</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {#each protokolls as protokoll}
                        <tr class="columns">
                            <td class="column" contenteditable="true">{protokoll.date}</td>
                            <td class="column" contenteditable="true">{protokoll.time}</td>
                            <td class="column" contenteditable="true">{protokoll.typ}</td>
                            <td class="column" contenteditable="true">{protokoll.designation}</td>
                            <td class="column"><img class="img-pencil" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXktw6DUv_3pFI96cPYwX1MmfoM-Hmy9Gn5zdn2xeOte_2DyPMQ_3Uk5eVtcU4dQL79e8&usqp=CAU" alt="pen"/></td>
                        </tr>
                    {/each}
                </tbody>
            </table>
            <div class="buttons">
                <button class="btnprint"on:click={print(protokolls)}>Drucken</button>
            </div>
        </div>
     </div>
 </div>


<style>

    .time {
        font-size: 2rem;
        font-weight: bold;
        color:black;
        margin-top: 1rem;
        margin-left: 11rem;
    }

    .name{
        text-align: right;
        margin-right: 15rem;
        margin-top: 1rem;
        font-family:"Roboto",sans-serif;
        font-weight:300;
        font-size: 40px;
    }

    .id{
       margin-bottom: 1em;
       margin-left:33.5rem;
    }

    .selects{
        margin-left: 10em;
        margin-bottom: 2em;
        width: 40%;
        margin-left: 30%;
        margin-right: 30%
    }


    .container{
        width: 100%;
        height: 200px;
        border: none;
    }

    .profile-image{
        border-radius: 50%;
        height:150px;
        width:150px;
        margin-left: 8.5rem;
    }

    .img-pencil{
        height:30px;
        width:30px;
    }

    .theadA{
        font-weight: bold;
        color:rgb(57, 57, 57);
    }

    .tableA{
        height: 50px;
        width:60%;
        border: collapse;
        font-family:"Roboto",sans-serif;
        font-weight:300;
        font-size: 15px;
        color: rgb(94, 94, 94);
        font-style: bold;
        margin-left: auto;
        margin-right: auto;
        text-align:left;

    }

    th{
    border: none;
    
    }

    .buttons{
        width: 40%;
        margin-left: 30%;
        margin-right: 30%
    }

    .btnprint{
        background-color: #9611bb;
        border-radius: 2em;
        height:3em;
        width: 9em;
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

    .btnclose{
        background-color:#008dd9;
        border-radius: 2em;
        margin: 2rem;
        height:3em;
        width: 9em;
        box-sizing: border-box;
        border:transparent;
        display:inline-block;
        padding:0.2em 1.2em;
        text-decoration:none;
        font-family:"Roboto",sans-serif;
        font-weight:300;
        color:#FFFFFF;
        text-shadow: 0 0.04em 0.04em;
        text-align:center;
        transition: all 0.2s;
    }

</style>