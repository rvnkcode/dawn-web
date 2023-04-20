import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

// Delete a selected item(task)
export const DELETE = (async ({ request }) => {
	const { id } = await request.json();

	await prisma.task.update({
		where: { id },
		data: { trash: true }
	});

	return json({}); // return nothing
}) satisfies RequestHandler;
