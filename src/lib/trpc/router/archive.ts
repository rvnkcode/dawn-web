import { publicProcedure, router } from '$lib/trpc/trpc';
import { prisma } from '$lib/server/prisma';
import type { Task } from '@prisma/client';
import {
	endOfDay,
	endOfMonth,
	format,
	getYear,
	startOfDay,
	startOfMonth,
	startOfYear,
	subDays,
	subMonths
} from 'date-fns';
import { z } from 'zod';

type pastMonthType = {
	year: string;
	month: string[];
};

const today = new Date();
const yesterday = subDays(today, 1);
const lastMonth = subMonths(today, 1);
const startOfThisYear = startOfYear(today);

const defaultArchiveFilter = {
	isDone: true,
	archive: true,
	trash: false
};

export const archiveRouter = router({
	getArchive: publicProcedure.query(async () => {
		const [todayList, yesterdayList, thisMonthList, more, thisYear, nulls, others] =
			await Promise.all([
				// Today
				await prisma.task.findMany({
					where: {
						...defaultArchiveFilter,
						completedAt: {
							gte: startOfDay(today)
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
									gte: startOfDay(yesterday)
								}
							},
							{
								completedAt: {
									lte: endOfDay(yesterday)
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
									gte: startOfMonth(today)
								}
							},
							{
								completedAt: {
									lt: startOfDay(yesterday)
								}
							}
						]
					},
					orderBy: {
						completedAt: 'desc'
					}
				}),

				await prisma.task.count({
					where: {
						...defaultArchiveFilter,
						OR: [
							{
								completedAt: null
							},
							{
								completedAt: {
									lt: startOfMonth(lastMonth)
								}
							}
						]
					}
				}),

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
									lte: endOfMonth(lastMonth)
								}
							}
						]
					},
					orderBy: {
						completedAt: 'desc'
					}
				}),

				await prisma.task.findMany({
					where: {
						...defaultArchiveFilter,
						completedAt: null
					}
				}),

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
				})
			]);

		const monthOfThisYear = [
			...new Set(
				thisYear.map((task: Task) => (task.completedAt ? format(task.completedAt, 'MMM') : ''))
			)
		];

		const years = [
			...new Set(
				others.map((task: Task) => (task.completedAt ? format(task.completedAt, 'y') : ''))
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
								.map((t: Task) => (t.completedAt ? format(t.completedAt, 'MMM') : ''))
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
			pastMonth
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

	archiveChecked: publicProcedure.mutation(async () => {
		try {
			await prisma.task.updateMany({
				where: {
					isDone: true,
					trash: false,
					status: 'inbox'
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
