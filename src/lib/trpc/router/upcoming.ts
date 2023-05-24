import { addDays, startOfDay } from 'date-fns';
import { utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';

import { prisma } from '$lib/server/prisma';
import { publicProcedure, router } from '$lib/trpc/trpc';

export const upcomingRouter = router({
	getUpcoming: publicProcedure.query(async (opts) => {
		const timeZone = opts.ctx.timeZone;
		const tomorrow = utcToZonedTime(addDays(new Date(), 1), timeZone);

		const tasks = await prisma.task.findMany({
			where: {
				trash: false,
				archive: false,
				allocatedTo: null,
				status: null,
				startedAt: {
					gte: zonedTimeToUtc(startOfDay(tomorrow), timeZone)
				}
			},
			orderBy: [{ isDone: 'asc' }, { startedAt: 'asc' }, { createdAt: 'desc' }]
		});

		return { tasks };
	})
});
