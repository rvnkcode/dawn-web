import { writable } from 'svelte/store';

export const selected = writable(new Set<number>());

export const isSelectModeOnMobile = writable(false);

export const showSidebar = writable(false);

export const selectedContacts = writable(new Set<number>());
