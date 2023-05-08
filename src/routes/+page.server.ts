import { prisma } from '$lib/server/prisma';
import type { Actions, PageServerLoad } from './$types';
import { createContext } from '$lib/trpc/context';
import { appRouter } from '$lib/trpc/router/index';

export const load: PageServerLoad = async () => ({
	tasks: appRouter.createCaller(await createContext()).inbox.getInbox()
});

const handleUrls = (url: string | undefined, rawUrls: string | undefined): string | null => {
	if (url) {
		if (rawUrls) {
			const rawUrlList = rawUrls.split(',');
			return rawUrlList.includes(url) ? rawUrls : rawUrls.concat(',', url);
		} else return url; // only exists url and not rawUrls
	} else if (rawUrls) {
		// only exists rawUrls and not url
		return rawUrls;
	} else return null;
};

export const actions = {
	createTask: async ({ request }) => {
		const { title, rawUrls, url } = Object.fromEntries(await request.formData()) as {
			title: string;
			rawUrls: string;
			url: string;
		};

		const urls = handleUrls(url, rawUrls);

		try {
			await prisma.task.create({
				data: { title, urls }
			});
		} catch (error) {
			console.error(error);
		}
	},

	updateTask: async ({ request }) => {
		const { id, title, rawUrls, url } = Object.fromEntries(await request.formData()) as {
			id: string;
			title: string;
			rawUrls: string;
			url: string;
		};

		const urls = handleUrls(url, rawUrls);

		try {
			await prisma.task.update({
				where: { id: +id },
				data: {
					title,
					urls
				}
			});
		} catch (error) {
			console.error(error);
		}
	}
} satisfies Actions;
