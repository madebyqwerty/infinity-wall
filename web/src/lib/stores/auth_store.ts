import { writable } from 'svelte/store';
import type { Record, Admin } from 'pocketbase';

const auth_store = writable<Record | Admin | null>();

export default {
	subscribe: auth_store.subscribe,
	set: auth_store.set
};
