<script>
    //import WeeklyFormular from "./components/WeeklyFormular.svelte";
    import LoginPage from "./components/LoginPage.svelte";
    import WeeklyFormular from "./components/WeeklyFormular.svelte";
    import DailyFormular from "./components/DailyFormular.svelte";
    import TimeTracking from "./components/TimeTracking.svelte";
    import Navbar from "./components/Navbar.svelte";
    import Router from "svelte-spa-router";
    import "../node_modules/bulma/css/bulma.min.css";
 
</script>

<Navbar>Your work time calulator</Navbar>
<Router routes={{"/":LoginPage}}></Router>
<Router routes={{"/Login":LoginPage}}></Router>
<Router routes={{"/TimeTracking":TimeTracking}}></Router>
<Router routes={{"/WeeklyFormular":WeeklyFormular}}></Router>
<Router routes={{"/DailyOverview":DailyFormular}}></Router>