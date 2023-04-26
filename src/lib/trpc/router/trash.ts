import { publicProcedure, router } from '$lib/trpc/trpc';
import { prisma } from '$lib/server/prisma';

export const trashRouter = router({
	getTrash: publicProcedure.query(async () => {
		return await prisma.task.findMany({
			where: {
				trash: true
			}
		});
	})
});
