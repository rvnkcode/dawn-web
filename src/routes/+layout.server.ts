import { createContext } from '$lib/trpc/context';
import { appRouter } from '$lib/trpc/router/index';

import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => ({
	count: appRouter.createCaller(await createContext(event)).count.getCounts()
});
