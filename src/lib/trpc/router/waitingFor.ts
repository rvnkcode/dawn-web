import { publicProcedure, router } from '$lib/trpc/trpc';
import { prisma } from '$lib/server/prisma';

// TODO: Grouping by contact?
export const waitingForRouter = router({
	getWaitingFor: publicProcedure.query(async () => {
		return await prisma.task.findMany({
			where: {
				trash: false,
				archive: false,
				NOT: {
					allocatedTo: null
				}
			},
			orderBy: [
				{
					isDone: 'asc'
				},
				{
					startedAt: 'asc'
				}
			]
		});
	})
});
