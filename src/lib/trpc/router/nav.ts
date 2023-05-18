import { publicProcedure, router } from '$lib/trpc/trpc';
import { prisma } from '$lib/server/prisma';

const filter = {
	trash: false,
	archive: false,
	isDone: false
};

export const countRouter = router({
	getCounts: publicProcedure.query(async () => {
		const [inboxCount, waitingForCount] = await Promise.all([
			// inbox count
			await prisma.task.count({
				where: {
					...filter,
					allocatedTo: null
				}
			}),

			// waiting for count
			await prisma.task.count({
				where: {
					...filter,
					NOT: {
						allocatedTo: null
					}
				}
			})
		]);

		return { inboxCount, waitingForCount };
	})
});
