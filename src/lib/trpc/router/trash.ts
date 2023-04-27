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
	}),

	emptyTrash: publicProcedure.mutation(async () => {
		try {
			await prisma.task.deleteMany({
				where: {
					trash: true
				}
			});
		} catch (error) {
			console.error(error);
		}
	}),

	trashSelected: publicProcedure.input(z.array(z.number())).mutation(async (opts) => {
		const { input } = opts;

		try {
			await prisma.task.updateMany({
				where: {
					id: { in: input }
				},
				data: {
					trash: true
				}
			});
		} catch (error) {
			console.error(error);
		}
	}),

	deleteTask: publicProcedure.input(z.number()).mutation(async (opts) => {
		const { input } = opts;

		try {
			await prisma.task.update({
				where: { id: input },
				data: { trash: true }
			});
		} catch (error) {
			console.error(error);
		}
	})
});
