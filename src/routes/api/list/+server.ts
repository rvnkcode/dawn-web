import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

export const DELETE = (async () => {
	await prisma.task.deleteMany({
		where: {
			trash: true
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
			trash: false
		}
	});

	return json({}); //return nothing
}) satisfies RequestHandler;
