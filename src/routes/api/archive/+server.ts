import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

// archive tasks
export const PATCH = (async () => {
	await prisma.task.updateMany({
		where: {
			isDone: true,
			trash: false,
			status: 'inbox'
		},
		data: {
			archive: true
		}
	});

	return json({});
}) satisfies RequestHandler;
