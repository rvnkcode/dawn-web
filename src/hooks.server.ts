import { createContext } from '$lib/trpc/context';
import { appRouter } from '$lib/trpc/router/index';
import type { Handle } from '@sveltejs/kit';
import { createTRPCHandle } from 'trpc-sveltekit';

export const handle: Handle = createTRPCHandle({ router: appRouter, createContext });
