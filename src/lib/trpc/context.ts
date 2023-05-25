import type { RequestEvent } from '@sveltejs/kit';
import type { inferAsyncReturnType } from '@trpc/server';

export async function createContext(event: RequestEvent) {
	try {
		const timeZone = event.cookies.get('timeZone');
		return { timeZone: timeZone ?? 'UTC' };
	} catch {
		return { timeZone: 'UTC' };
	}
}

export type Context = inferAsyncReturnType<typeof createContext>;
