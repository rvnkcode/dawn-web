import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

// check item
export const PATCH = (async ({ request }) => {
	const { id, checked } = await request.json();
	let completedAt: Date | null;

	if (checked) {
		completedAt = new Date();
	} else completedAt = null;

	await prisma.task.update({
		where: { id },
		data: {
			isDone: checked,
			completedAt
		}
	});

	return json({}); // return nothing
}) satisfies RequestHandler;

export const DELETE = (async ({ request }) => {
	const ids = await request.json();

	await prisma.task.updateMany({
		where: {
			id: { in: ids }
		},
		data: {
			status: 'trash'
		}
	});

	return json({}); //return nothing
}) satisfies RequestHandler;
