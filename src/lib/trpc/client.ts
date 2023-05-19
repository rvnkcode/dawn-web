import superjson from 'superjson';
import { createTRPCClient, type TRPCClientInit } from 'trpc-sveltekit';

import type { AppRouter } from './router/index';

let browserClient: ReturnType<typeof createTRPCClient<AppRouter>>;

export function trpc(init?: TRPCClientInit) {
	const isBrowser = typeof window !== 'undefined';
	if (isBrowser && browserClient) return browserClient;

	const client = createTRPCClient<AppRouter>({ init, transformer: superjson });
	if (isBrowser) browserClient = client;
	return client;
}
