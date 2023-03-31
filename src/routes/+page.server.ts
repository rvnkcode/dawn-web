import { prisma } from '$lib/server/prisma';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = (async () => {
	return { tasks: await prisma.task.findMany() };
}) satisfies PageServerLoad;

export const actions: Actions = {
	createTask: async ({ request }) => {
		const { title } = Object.fromEntries(await request.formData()) as {
			title: string;
		};

		try {
			await prisma.task.create({
				data: { title }
			});
		} catch (error) {
			console.error(error);
			return fail(500, { message: `Could not create the task` });
		}
	}
};
