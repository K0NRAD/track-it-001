<script>
    import newDate from ''

const startButtonClicked = () => {
    let timeStart = new Date();
    let dateAndTime = timeStart.getDate() + " " + timeStart.getTime();
} 
</script>


<div>
<button class="button" on:click={startButtonClicked() }text="Start work"</button>
</div>