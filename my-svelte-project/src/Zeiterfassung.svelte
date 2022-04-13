<script>

    const startButtonClicked = () => {
        let timeStart = new Date();
        let dateAndTime = timeStart.getDate() + " " + timeStart.getTime();
    } 
    </script>
    
    
    <div>
    <button class="button" on:click={startButtonClicked() }>Start work</button>
    </div>