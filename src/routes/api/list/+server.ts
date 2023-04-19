import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

// empty trash
export const DELETE = (async () => {
	await prisma.task.deleteMany({
		where: {
			status: 'trash'
		}
	});

	return json({}); // return nothing
}) satisfies RequestHandler;

// move to inbox
export const PATCH = (async ({ request }) => {
	const ids = await request.json();
	await prisma.task.updateMany({
		where: {
			id: { in: ids }
		},
		data: {
			status: 'inbox'
		}
	});

	return json({}); //return nothing
}) satisfies RequestHandler;
