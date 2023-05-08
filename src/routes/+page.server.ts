import { prisma } from '$lib/server/prisma';
import type { Actions, PageServerLoad } from './$types';
import { createContext } from '$lib/trpc/context';
import { appRouter } from '$lib/trpc/router/index';

export const load: PageServerLoad = async () => ({
	tasks: appRouter.createCaller(await createContext()).inbox.getInbox()
});

export const actions = {
	createTask: async ({ request }) => {
		const { title, rawUrls, url } = Object.fromEntries(await request.formData()) as {
			title: string;
			rawUrls: string;
			url: string;
		};

		let urls: null | string = null;

		if (url) {
			if (rawUrls) {
				const rawUrlList = rawUrls.split(',');
				urls = rawUrlList.includes(url) ? rawUrls : rawUrls.concat(',', url);
			} else urls = url;
		} else urls = rawUrls;

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
