import type { Task } from '@prisma/client';
import {
	endOfDay,
	endOfMonth,
	getYear,
	startOfDay,
	startOfMonth,
	startOfYear,
	subDays,
	subMonths
} from 'date-fns';
import { formatInTimeZone, utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';
import { z } from 'zod';

import { prisma } from '$lib/server/prisma';
import { publicProcedure, router } from '$lib/trpc/trpc';
import { zPathEnum, type zPathType } from '$lib/zod';

type pastMonthType = {
	year: string;
	month: string[];
};

const defaultArchiveFilter = {
	isDone: true,
	archive: true,
	trash: false
};

export const archiveRouter = router({
	getArchive: publicProcedure.query(async (opts) => {
		const timeZone = opts.ctx.timeZone;

		const today = utcToZonedTime(new Date(), timeZone);
		const yesterday = subDays(today, 1);
		const lastMonth = subMonths(today, 1);
		const startOfThisYear = startOfYear(today);

		const [todayList, yesterdayList, thisMonthList, more, thisYear, nulls, others, canBeArchived] =
			await Promise.all([
				// Today
				await prisma.task.findMany({
					where: {
						...defaultArchiveFilter,
						completedAt: {
							gte: zonedTimeToUtc(startOfDay(today), timeZone)
						}
					},
					orderBy: {
						completedAt: 'desc'
					}
				}),

				// Yesterday
				await prisma.task.findMany({
					where: {
						...defaultArchiveFilter,
						AND: [
							{
								completedAt: {
									gte: zonedTimeToUtc(startOfDay(yesterday), timeZone)
								}
							},
							{
								completedAt: {
									lte: zonedTimeToUtc(endOfDay(yesterday), timeZone)
								}
							}
						]
					},
					orderBy: {
						completedAt: 'desc'
					}
				}),

				// This month
				await prisma.task.findMany({
					where: {
						...defaultArchiveFilter,
						AND: [
							{
								completedAt: {
									gte: zonedTimeToUtc(startOfMonth(today), timeZone)
								}
							},
							{
								completedAt: {
									lt: zonedTimeToUtc(startOfDay(yesterday), timeZone)
								}
							}
						]
					},
					orderBy: {
						completedAt: 'desc'
					}
				}),

				// Count of more archives
				await prisma.task.count({
					where: {
						...defaultArchiveFilter,
						OR: [
							{
								completedAt: null
							},
							{
								completedAt: {
									lt: zonedTimeToUtc(startOfMonth(lastMonth), timeZone)
								}
							}
						]
					}
				}),

				// This year
				await prisma.task.findMany({
					where: {
						...defaultArchiveFilter,
						AND: [
							{
								completedAt: {
									gte: startOfThisYear
								}
							},
							{
								completedAt: {
									lte: zonedTimeToUtc(endOfMonth(lastMonth), timeZone)
								}
							}
						]
					},
					orderBy: {
						completedAt: 'desc'
					}
				}),

				// Null
				await prisma.task.findMany({
					where: {
						...defaultArchiveFilter,
						completedAt: null
					}
				}),

				// ~last year
				await prisma.task.findMany({
					where: {
						...defaultArchiveFilter,
						completedAt: {
							lt: startOfThisYear
						}
					},
					orderBy: {
						completedAt: 'desc'
					}
				}),

				// Can be archived
				await prisma.task.count({
					where: {
						isDone: true,
						trash: false,
						archive: false
					}
				})
			]);

		const monthOfThisYear = [
			...new Set(
				thisYear.map((task: Task) =>
					task.completedAt ? formatInTimeZone(task.completedAt, timeZone, 'MMM') : ''
				)
			)
		];

		const years = [
			...new Set(
				others.map((task: Task) =>
					task.completedAt ? formatInTimeZone(task.completedAt, timeZone, 'y') : ''
				)
			)
		];

		const pastMonth: pastMonthType[] = [];

		if (years.length > 0) {
			for (let i = 0; i < years.length; i++) {
				pastMonth.push({
					year: years[i],
					month: [
						...new Set(
							others
								.filter((t: Task) => {
									if (t.completedAt) {
										return getYear(t.completedAt) === +years[i];
									}
								})
								.map((t: Task) =>
									t.completedAt ? formatInTimeZone(t.completedAt, timeZone, 'MMM') : ''
								)
						)
					]
				});
			}
		}

		// [0: {year: 2023, month: [Jan, Feb, Mar...]}]
		// console.log(pastMonth); // Debug

		return {
			todayList,
			yesterdayList,
			thisMonthList,
			more,
			thisYear,
			monthOfThisYear,
			nulls,
			others,
			pastMonth,
			canBeArchived
		};
	}),

	archiveTask: publicProcedure.input(z.number()).mutation(async (opt) => {
		const { input } = opt;

		try {
			await prisma.task.update({
				where: { id: input },
				data: { archive: true, trash: false }
			});
		} catch (error) {
			console.error(error);
		}
	}),

	archiveChecked: publicProcedure.input(z.string(zPathEnum)).mutation(async (opt) => {
		const { input } = opt;

		const handleStatus = (input: zPathType) => {
			switch (input) {
				case '/someday':
					return 'someday';

				case '/anytime':
					return 'anytime';

				default:
					return null;
			}
		};

		try {
			await prisma.task.updateMany({
				where: {
					isDone: true,
					trash: false,
					NOT: {
						allocatedTo: input === '/waiting_for' ? null : undefined, // waiting_for
						startedAt: input === '/today' ? null : undefined // today
					},
					status: handleStatus(input as zPathType),
					// inbox
					allocatedTo: input !== '/waiting_for' ? null : undefined,
					startedAt: input !== '/today' ? null : undefined
				},
				data: {
					archive: true
				}
			});
		} catch (error) {
			console.error(error);
		}
	}),

	undoArchive: publicProcedure.input(z.number()).mutation(async (opts) => {
		const { input } = opts;

		try {
			await prisma.task.update({
				where: { id: input },
				data: { archive: false }
			});
		} catch (error) {
			console.error(error);
		}
	}),

	archiveMore: publicProcedure.mutation(async () => {
		try {
			await prisma.task.updateMany({
				where: {
					isDone: true,
					trash: false,
					archive: false
				},
				data: {
					archive: true
				}
			});
		} catch (error) {
			console.error(error);
		}
	})
});
