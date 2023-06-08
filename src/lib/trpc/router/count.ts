import { endOfDay } from 'date-fns';
import { utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';

import { prisma } from '$lib/server/prisma';
import { publicProcedure, router } from '$lib/trpc/trpc';

const filter = {
	trash: false,
	archive: false,
	isDone: false,
	status: null
};

export const countRouter = router({
	getCounts: publicProcedure.query(async (opts) => {
		const timeZone = opts.ctx.timeZone;
		const todayDate = utcToZonedTime(new Date(), timeZone);

		const [inbox, today, waiting] = await Promise.all([
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
						lte: zonedTimeToUtc(endOfDay(todayDate), timeZone)
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

		return { inbox, today, waiting };
	})
});
