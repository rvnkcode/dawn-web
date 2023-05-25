import { endOfDay } from 'date-fns';
import { utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';

import { prisma } from '$lib/server/prisma';
import { publicProcedure, router } from '$lib/trpc/trpc';

export const todayRouter = router({
	getToday: publicProcedure.query(async (opts) => {
		const timeZone = opts.ctx.timeZone;
		const today = utcToZonedTime(new Date(), timeZone);

		const tasks = await prisma.task.findMany({
			where: {
				trash: false,
				archive: false,
				allocatedTo: null,
				status: null,
				startedAt: {
					lte: zonedTimeToUtc(endOfDay(today), timeZone)
				}
			},
			orderBy: [{ isDone: 'asc' }, { startedAt: 'asc' }, { createdAt: 'desc' }]
		});

		return { tasks };
	})
});
