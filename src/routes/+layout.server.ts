import type { LayoutServerLoad } from './$types';
import { createContext } from '$lib/trpc/context';
import { appRouter } from '$lib/trpc/router/index';

export const load: LayoutServerLoad = async (event) => ({
	count: appRouter.createCaller(await createContext(event)).count.getCounts()
});
