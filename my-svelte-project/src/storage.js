import { writable } from "svelte/store";

export const user = writable([
    { name: "Manuel", persnum: 12345 }
]);