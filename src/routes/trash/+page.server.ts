import type { PageServerLoad } from './$types';
import { createContext } from '$lib/trpc/context';
import { appRouter } from '$lib/trpc/router/index';

export const load: PageServerLoad = async () => ({
	tasks: appRouter.createCaller(await createContext()).trash.getTrash()
});
