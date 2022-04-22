
<script>
import LocalStorageApi from "../LocalStorageApi.js";
import { timeRecordsStore } from "../store.js";
import Icon from '@iconify/svelte';



    let isActive = "";
    let angle="fa:angle-down"


    const dropdownHandler = () => {
      if(isActive === ""){
        isActive = "is-active";
        angle="fa:angle-up";
      }else{
        isActive = "";
        angle="fa:angle-down";
      }
    }
  
    const logOut = () => {
      $timeRecordsStore = [];
      LocalStorageApi.saveUser("");
            LocalStorageApi.saveNum("");
      
    };

</script>

<selection class="hero is-success welcome is-small">
    <div class="hero-body">
        <div class="container">
            <h1 class="title">Track IT</h1>
            <h2 class="subtitle"><slot></slot></h2>
            <div class="dropdown {isActive} is-right">
              <div class="dropdown-trigger">
                <button class="button is-rounded" on:click={dropdownHandler} aria-haspopup="true" aria-controls="dropdown-menu3">
                  <span>Menu</span>
                  <span class="icon is-small">
                    <Icon icon="{angle}" aria-hidden="true" />
                  </span>
                </button>
              </div>
              <div class="dropdown-menu" id="dropdown-menu3" role="menu">
                <div class="dropdown-content">
                  <a href="/#/Login" class="dropdown-item" on:click={logOut}>
                    Log out
                  </a>
                </div>
              </div>
            </div>
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

<style>
    .dropdown{
      float: right;
      margin-bottom: 3rem;
    }

</style>