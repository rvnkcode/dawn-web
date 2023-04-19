import { prisma } from '$lib/server/prisma';
import type { Actions, PageServerLoad } from './$types';

export const load = (async () => {
	return {
		tasks: await prisma.task.findMany({
			where: {
				status: 'inbox'
			}
		})
	};
}) satisfies PageServerLoad;

export const actions = {
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
