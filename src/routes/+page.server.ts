import { prisma } from '$lib/server/prisma';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = (async () => {
	return {
		tasks: await prisma.task.findMany({
			where: {
				trash: false
			}
		})
	};
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
	},

	trashSelectedTasks: async ({ request }) => {
		const ids: number[] = Array.from((await request.formData()).keys()).map((e: string) => {
			return +e;
		});

		try {
			await prisma.task.updateMany({
				where: {
					id: { in: ids }
				},
				data: {
					trash: true
				}
			});
		} catch (error) {
			console.error(error);
			return fail(500, { message: `Could not trash the task` });
		}
	}
} satisfies Actions;
