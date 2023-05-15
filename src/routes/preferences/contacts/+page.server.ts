import { createContext } from '$lib/trpc/context';
import { appRouter } from '$lib/trpc/router';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return appRouter.createCaller(await createContext()).contact.getAllContacts();
};
