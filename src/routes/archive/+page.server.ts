import type { PageServerLoad } from './$types';
import { appRouter } from '$lib/trpc/router';
import { createContext } from '$lib/trpc/context';

export const load: PageServerLoad = async ({ cookies }) => {
	const timeZone = cookies.get('timeZone');
	return appRouter.createCaller(await createContext()).archive.getArchive(timeZone ?? 'UTC');
};
