import { prisma } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	return {
		tasks: await prisma.task.findMany({
			where: {
				isDone: true,
				archive: true,
				trash: false
			},
			orderBy: {
				completedAt: 'desc'
			}
		})
	};
}) satisfies PageServerLoad;
