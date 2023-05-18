import type { PageServerLoad } from './$types';
import { createContext } from '$lib/trpc/context';
import { appRouter } from '$lib/trpc/router/index';

export const load: PageServerLoad = async (event) => ({
	tasks: appRouter.createCaller(await createContext(event)).trash.getTrash()
});
