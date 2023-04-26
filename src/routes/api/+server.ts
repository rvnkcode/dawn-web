import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

// check item
export const PATCH = (async ({ request }) => {
	const { id, checked, isArchived } = await request.json();
	let completedAt: Date | null;
	let archive = isArchived;

	if (checked) {
		completedAt = new Date();
	} else {
		completedAt = null;
		archive = false;
	}

	await prisma.task.update({
		where: { id },
		data: {
			isDone: checked,
			completedAt,
			archive
		}
	});

	return json({}); // return nothing
}) satisfies RequestHandler;
