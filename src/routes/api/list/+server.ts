import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

export const DELETE = (async () => {
	await prisma.task.deleteMany({
		where: {
			category: 'trash'
		}
	});

	return json({}); // return nothing
}) satisfies RequestHandler;

export const PATCH = (async ({ request }) => {
	const ids = await request.json();
	await prisma.task.updateMany({
		where: {
			id: { in: ids }
		},
		data: {
			category: 'inbox'
		}
	});

	return json({}); //return nothing
}) satisfies RequestHandler;
