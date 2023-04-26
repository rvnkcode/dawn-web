import { publicProcedure, router } from '$lib/trpc/trpc';
import { prisma } from '$lib/server/prisma';
import { z } from 'zod';

export const trashRouter = router({
	getTrash: publicProcedure.query(async () => {
		return await prisma.task.findMany({
			where: {
				trash: true
			}
		});
	}),

	undoTrash: publicProcedure.input(z.number()).mutation(async (opts) => {
		const { input } = opts;

		try {
			await prisma.task.update({
				where: { id: input },
				data: { trash: false }
			});
		} catch (error) {
			console.error(error);
		}
	})
});
