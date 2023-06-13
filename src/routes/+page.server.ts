import { fail } from '@sveltejs/kit';
import { z } from 'zod';

import { prisma } from '$lib/server/prisma';
import { createContext } from '$lib/trpc/context';
import { appRouter } from '$lib/trpc/router/index';

import { zTaskSchema } from '../lib/zod';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => ({
	tasks: appRouter.createCaller(await createContext(event)).inbox.getInbox()
});

export const actions: Actions = {
	createTask: async ({ request }) => {
		try {
			const input = await zTaskSchema.parseAsync(Object.fromEntries(await request.formData()));
			console.log(input);

			const { url, allocatedTo, ...data } = input;

			await prisma.task.create({
				data: {
					...data,
					urls: url,
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
							: undefined
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
