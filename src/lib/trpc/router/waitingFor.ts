import { publicProcedure, router } from '$lib/trpc/trpc';
import { prisma } from '$lib/server/prisma';

export const waitingForRouter = router({
	getWaitingFor: publicProcedure.query(async () => {
		return await prisma.task.findMany({
			where: {
				trash: false,
				archive: false,
				NOT: {
					allocatedTo: null
				}
			}
		});
	})
});
