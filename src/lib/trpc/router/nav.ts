import { addDays, endOfDay, startOfDay } from 'date-fns';
import { utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';

import { prisma } from '$lib/server/prisma';
import { publicProcedure, router } from '$lib/trpc/trpc';

const filter = {
	trash: false,
	archive: false,
	isDone: false
};

export const countRouter = router({
	getCounts: publicProcedure.query(async (opts) => {
		const timeZone = opts.ctx.timeZone;
		const today = utcToZonedTime(new Date(), timeZone);

		const [inboxCount, todayCount, waitingForCount, upcomingCount] = await Promise.all([
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
						lte: zonedTimeToUtc(endOfDay(today), timeZone)
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
			}),

			// upcoming count
			await prisma.task.count({
				where: {
					...filter,
					allocatedTo: null,
					startedAt: {
						gte: zonedTimeToUtc(startOfDay(addDays(today, 1)), timeZone)
					}
				}
			})
		]);

		return { inboxCount, todayCount, waitingForCount, upcomingCount };
	})
});
