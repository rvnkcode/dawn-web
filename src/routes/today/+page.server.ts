import type { PageServerLoad } from '../$types';
import { createContext } from '$lib/trpc/context';
import { appRouter } from '$lib/trpc/router';

export const load: PageServerLoad = async (event) => {
	return appRouter.createCaller(await createContext(event)).today.getToday();
};
