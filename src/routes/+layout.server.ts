import { prisma } from '$lib/server/prisma';
import type { LayoutServerLoad } from './$types';

export const load = (async () => {
	return {
		count: await prisma.task.count({
			where: {
				trash: false
			}
		})
	};
}) satisfies LayoutServerLoad;
