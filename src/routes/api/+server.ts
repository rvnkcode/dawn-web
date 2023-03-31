import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

export const PATCH = (async ({ request }) => {
	const { id, checked } = await request.json();

	await prisma.task.update({
		where: { id },
		data: {
			isDone: checked
		}
	});

	return json({}); // return nothing
}) satisfies RequestHandler;
