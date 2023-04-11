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
