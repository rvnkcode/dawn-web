import { publicProcedure, router } from '$lib/trpc/trpc';
import { prisma } from '$lib/server/prisma';
import { utcToZonedTime } from 'date-fns-tz';

export const todayRouter = router({
	getToday: publicProcedure.query(async (opts) => {
		const timeZone = opts.ctx.timeZone;

		const today = utcToZonedTime(new Date(), timeZone);

		const tasks = await prisma.task.findMany({
			where: {
				trash: false,
				archive: false,
				allocatedTo: null,
				startedAt: {
					lte: today
				}
			},
			orderBy: {
				isDone: 'asc'
			}
		});

		return { tasks };
	})
});
