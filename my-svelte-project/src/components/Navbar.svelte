<script>
    import LoginPage from "./LoginPage.svelte";

    let form;
</script>

<selection class="hero is-primary welcome is-small">
    <div class="hero-body">
        <div class="container">
            <h1 class="title">Track IT</h1>
            <h2 class="subtitle"><slot></slot></h2>
        </div>
    </div>
</selection>
<div class="box">
    <div class="container">
        <div class="field is-grouped">
            <div class="tabs">
                <ul>
                    <li><a href="/#/Login">Login</a></li>
                    <li><a href="/#/TimeTracking">Time Tracking</a></li>
                    <li><a href="/#/WeeklyFormular">Week Overview</a></li>
                    <li><a href="/#/DailyOverview">Daily Overview</a></li>
                </ul>
            </div>
        </div>
    </div>
</div>