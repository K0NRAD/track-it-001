import { writable } from "svelte/store"; 

//Get existing data
const storedTimeRecords = localStorage.getItem("timerecords"); 

export const timeRecordsStore = writable(JSON.parse(storedTimeRecords || "[]")); 

timeRecordsStore.subscribe((timeRecords) => localStorage.setItem("timerecords", JSON.stringify(timeRecords)));