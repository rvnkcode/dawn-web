import { createContext } from '$lib/trpc/context';
import { appRouter } from '$lib/trpc/router';

import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async (event) => ({
	tasks: await appRouter.createCaller(await createContext(event)).someday.getSomeday()
});
