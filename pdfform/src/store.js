import { writable } from "svelte/store";

export let form = writable({});
export let isEditing = writable(false);
export let saveForm = writable(false);
