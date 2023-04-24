import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

// empty trash
export const DELETE = (async () => {
	await prisma.task.deleteMany({
		where: {
			trash: true
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
			status: 'inbox',
			trash: false,
			archive: false
		}
	});

	return json({}); //return nothing
}) satisfies RequestHandler;
