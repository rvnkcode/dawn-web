import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

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
