<script>
  import LocalStorageApi from "../LocalStorageApi.js";
  import { timeRecordsStore } from "../store.js";
  import Icon from "@iconify/svelte";
  import { onMount } from "svelte";

  let isActive = "";
  let angle = "fa:angle-down";
  let user;
  let persnum;

  onMount(async () => {
    const interval = setInterval(() => {
      loadUserData();
    }, 1000);
  });

  async function loadUserData() {
    if(LocalStorageApi.loadUser() !== undefined && LocalStorageApi.loadNum() !== undefined){
      user = await LocalStorageApi.loadUser();
      persnum = await LocalStorageApi.loadNum();
    }
  }

  const dropdownHandler = () => {
    if (isActive === "") {
      isActive = "is-active";
      angle = "fa:angle-up";
    } else {
      isActive = "";
      angle = "fa:angle-down";
    }
  };

  const logOut = () => {
    $timeRecordsStore = [];
    LocalStorageApi.deleteUser();
    user = "";
    persnum = "";
  };
</script>

<selection class="hero is-success welcome is-small">
  <div class="hero-body">
    <div class="container">
      <h1 class="title">Track IT</h1>
      <h2 class="subtitle"><slot /></h2>
    </div>
    <div class="container2">
        <div class="name">
          {user}
        </div>
        <div class="place" />
        <div class="id">
          {persnum}
        </div>
      <div class="place" />
      <div class="dropdown {isActive} is-right">
        <div class="dropdown-trigger">
          <button
            class="button"
            on:click={dropdownHandler}
            aria-haspopup="true"
            aria-controls="dropdown-menu3"
          >
            <span class="Menu">Menu</span>
            <span class="icon is-small">
              <Icon icon={angle} aria-hidden="true" />
            </span>
          </button>
        </div>
        <div class="dropdown-menu" id="dropdown-menu3" role="menu">
            <a href="/#/Login" class="button button2" on:click={logOut}>
              Log out
            </a>
        </div>
      </div>
    </div>
  </div>
</selection>
<div class="box">
  <div class="container-navbar">
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

<style>

  .dropdown {
    margin: 0 0 5% 80%;
  }

  h1 {
    font-size: 3em;
  }

  h2 {
    font-size: 2em;
  }

  .container {
    float:left;
    width: 50%;
    margin: 0 0 0 15%;
  }

  .container-navbar {
    margin: 0 0 0 15%;
    width: 80%;
  }

  .box {
    padding: 0.8rem;
    width: 100%;
  }

  .container2 {
    width: 20%;
    float: right;
  }

  .button {
    border-radius: 2rem;
    width: 90%;
    text-align: center;
  }

  .button2 {
    width: 45%;
    margin: 0 0 0 50%;
  }

  .logout {
    border-radius: 2rem;
    width: 90%;
    text-align: center;
  }

  .dropdown-content {
    margin: 0 0 0 48%;
    border-radius: 2rem;
    width: 50%;
    height: 1%;
    background-color: white;
    border: 1em;
  }

  .dropdown-item {
    width: 100%;
    height: 2%;
    border-radius: 2rem;
  }

  .place {
    height: 2rem;
    width: 100%;
    user-select: none;
  }
  .name {
    float: right;
  }
  .id {
    float: right;
  }
</style>
