import { z } from 'zod';

import { prisma } from '$lib/server/prisma';
import { publicProcedure, router } from '$lib/trpc/trpc';

const CategoryEnum = z.enum(['inbox', 'someday']);

export const listRouter = router({
	moveSelected: publicProcedure
		.input(z.object({ dest: z.string(CategoryEnum), ids: z.array(z.number()) }))
		.mutation(async (opts) => {
			const { input } = opts;

			try {
				await prisma.task.updateMany({
					where: { id: { in: input.ids } },
					data: {
						trash: false,
						archive: false,
						allocatedTo: null,
						startedAt: null,
						status: input.dest === 'inbox' ? null : input.dest
					}
				});
			} catch (error) {
				console.error(error);
			}
		}),

	updateStartDate: publicProcedure
		.input(z.object({ date: z.coerce.date(), ids: z.array(z.number()) }))
		.mutation(async (opts) => {
			const { input } = opts;

			try {
				await prisma.task.updateMany({
					where: { id: { in: input.ids } },
					data: {
						startedAt: input.date
					}
				});
			} catch (error) {
				console.error(error);
			}
		})
});
