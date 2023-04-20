import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

// archive single task
export const PATCH = (async ({ request }) => {
	const { id } = await request.json();

	await prisma.task.update({
		where: { id },
		// data: { status: 'archive' }
		data: { archive: true, trash: false }
	});

	return json({});
}) satisfies RequestHandler;
