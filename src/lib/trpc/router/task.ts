import { publicProcedure, router } from '$lib/trpc/trpc';
import { prisma } from '$lib/server/prisma';
import { z } from 'zod';

export const taskRouter = router({
	toggleCompleted: publicProcedure
		.input(z.object({ id: z.number(), checked: z.boolean(), isArchived: z.boolean() }))
		.mutation(async (opt) => {
			const { input } = opt;
			let completedAt: Date | null;
			let archive = input.isArchived;

			if (input.checked) {
				completedAt = new Date();
			} else {
				completedAt = null;
				archive = false;
			}

			try {
				await prisma.task.update({
					where: { id: input.id },
					data: {
						isDone: input.checked,
						completedAt,
						archive
					}
				});
			} catch (error) {
				console.error(error);
			}
		})
});
