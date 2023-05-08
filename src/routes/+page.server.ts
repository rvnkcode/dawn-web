import { prisma } from '$lib/server/prisma';
import type { Actions, PageServerLoad } from './$types';
import { createContext } from '$lib/trpc/context';
import { appRouter } from '$lib/trpc/router/index';

export const load: PageServerLoad = async () => ({
	tasks: appRouter.createCaller(await createContext()).inbox.getInbox()
});

export const actions = {
	createTask: async ({ request }) => {
		const { title, urls } = Object.fromEntries(await request.formData()) as {
			title: string;
			urls: string;
		};

		try {
			await prisma.task.create({
				data: { title, urls }
			});
		} catch (error) {
			console.error(error);
		}
	},

	updateTask: async ({ request }) => {
		const { id, title } = Object.fromEntries(await request.formData()) as {
			id: string;
			title: string;
		};

		try {
			await prisma.task.update({
				where: { id: +id },
				data: {
					title
				}
			});
		} catch (error) {
			console.error(error);
		}
	}
} satisfies Actions;
