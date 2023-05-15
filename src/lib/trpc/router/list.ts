import { publicProcedure, router } from '$lib/trpc/trpc';
import { prisma } from '$lib/server/prisma';
import { z } from 'zod';

const CategoryEnum = z.enum(['inbox']);

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
						archive: false
					}
				});
			} catch (error) {
				console.error(error);
			}
		})
});
