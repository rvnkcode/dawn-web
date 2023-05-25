import { fail } from '@sveltejs/kit';
import { z } from 'zod';

import { prisma } from '$lib/server/prisma';
import { createContext } from '$lib/trpc/context';
import { appRouter } from '$lib/trpc/router/index';

import { zTaskCreateInput, zTaskUpdateInput } from '../lib/zod';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => ({
	tasks: appRouter.createCaller(await createContext(event)).inbox.getInbox()
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

export const actions: Actions = {
	createTask: async ({ request }) => {
		try {
			const input = await zTaskCreateInput.parseAsync(Object.fromEntries(await request.formData()));

			const { rawUrls, url, allocatedTo, status, ...data } = input;
			const urls = handleUrls(url, rawUrls);

			await prisma.task.create({
				data: {
					...data,
					urls,
					contact:
						allocatedTo != null
							? {
									connectOrCreate: {
										where: {
											name: allocatedTo
										},
										create: {
											name: allocatedTo
										}
									}
							  }
							: undefined,
					status: data.startedAt || allocatedTo ? null : status
				}
			});
		} catch (error) {
			console.error(error);

			if (error instanceof z.ZodError) {
				return fail(400, { error: error.issues });
			} else {
				return fail(500);
			}
		}
	},

	updateTask: async ({ request }) => {
		try {
			const input = await zTaskUpdateInput.parseAsync(Object.fromEntries(await request.formData()));

			const { id, rawUrls, url, allocatedTo, status, ...data } = input;
			const urls = handleUrls(url, rawUrls);

			await prisma.task.update({
				where: {
					id
				},
				data: {
					...data,
					urls,
					contact:
						allocatedTo != null
							? {
									connectOrCreate: {
										where: {
											name: allocatedTo
										},
										create: {
											name: allocatedTo
										}
									}
							  }
							: {
									disconnect: true
							  },
					status: data.startedAt || allocatedTo ? null : status
				}
			});
		} catch (error) {
			console.error(error);

			if (error instanceof z.ZodError) {
				return fail(400, { error: error.issues });
			} else {
				return fail(500);
			}
		}
	}
};
