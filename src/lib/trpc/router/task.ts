import { isFuture } from 'date-fns';
import { z } from 'zod';

import { prisma } from '$lib/server/prisma';
import { publicProcedure, router } from '$lib/trpc/trpc';

export const taskRouter = router({
	toggleCompleted: publicProcedure
		.input(
			z.object({
				id: z.number(),
				checked: z.boolean(),
				isArchived: z.boolean(),
				startedAt: z.date().optional()
			})
		)
		.mutation(async (opt) => {
			const { input } = opt;
			let completedAt: Date | null;
			let startedAt: Date | undefined = undefined;
			let archive = input.isArchived;
			const today = new Date();

			if (input.checked) {
				completedAt = today;
				if (input.startedAt && isFuture(input.startedAt)) {
					startedAt = today;
				}
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
						archive,
						startedAt
					}
				});
			} catch (error) {
				console.error(error);
			}
		})
});
