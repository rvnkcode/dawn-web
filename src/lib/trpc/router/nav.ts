import { publicProcedure, router } from '$lib/trpc/trpc';
import { prisma } from '$lib/server/prisma';
import { utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';

const filter = {
	trash: false,
	archive: false,
	isDone: false
};

export const countRouter = router({
	getCounts: publicProcedure.query(async (opts) => {
		const timeZone = opts.ctx.timeZone;
		const today = utcToZonedTime(new Date(), timeZone);

		const [inboxCount, todayCount, waitingForCount] = await Promise.all([
			// inbox count
			await prisma.task.count({
				where: {
					...filter,
					allocatedTo: null,
					startedAt: null
				}
			}),

			// today count
			await prisma.task.count({
				where: {
					...filter,
					allocatedTo: null,
					startedAt: {
						lte: zonedTimeToUtc(today, timeZone)
					}
				}
			}),

			// waiting for count
			await prisma.task.count({
				where: {
					...filter,
					NOT: {
						allocatedTo: null
					}
				}
			})
		]);

		return { inboxCount, todayCount, waitingForCount };
	})
});
