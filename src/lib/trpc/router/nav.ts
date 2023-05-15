import { publicProcedure, router } from '$lib/trpc/trpc';
import { prisma } from '$lib/server/prisma';

export const countRouter = router({
	getInboxCount: publicProcedure.query(async () => {
		return await prisma.task.count({
			where: {
				trash: false,
				archive: false,
				isDone: false,
				allocatedTo: null
			}
		});
	})
});
