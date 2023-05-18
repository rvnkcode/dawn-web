import { publicProcedure, router } from '$lib/trpc/trpc';
import { prisma } from '$lib/server/prisma';

export const inboxRouter = router({
	getInbox: publicProcedure.query(async () => {
		return await prisma.task.findMany({
			where: {
				trash: false,
				archive: false,
				allocatedTo: null
			},
			orderBy: {
				isDone: 'asc'
			}
		});
	})
});
