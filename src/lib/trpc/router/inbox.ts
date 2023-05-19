import { prisma } from '$lib/server/prisma';
import { publicProcedure, router } from '$lib/trpc/trpc';

export const inboxRouter = router({
	getInbox: publicProcedure.query(async () => {
		return await prisma.task.findMany({
			where: {
				trash: false,
				archive: false,
				allocatedTo: null,
				startedAt: null
			},
			orderBy: {
				isDone: 'asc'
			}
		});
	})
});
