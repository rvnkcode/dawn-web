import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

// Undo trash
export const PATCH = (async ({ request }) => {
	const { id } = await request.json();

	await prisma.task.update({
		where: { id },
		data: { trash: false }
	});

	return json({});
}) satisfies RequestHandler;
