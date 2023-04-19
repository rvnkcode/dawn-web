import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

export const PATCH = (async () => {
	await prisma.task.updateMany({
		where: {
			isDone: true,
			status: 'inbox'
		},
		data: {
			status: 'archive'
		}
	});

	return json({});
}) satisfies RequestHandler;
