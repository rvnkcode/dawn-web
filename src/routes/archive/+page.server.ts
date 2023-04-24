import { prisma } from '$lib/server/prisma';
import type { Task } from '@prisma/client';
import type { PageServerLoad } from './$types';
import { format, getYear, isThisMonth, isThisYear, isToday, isYesterday } from 'date-fns';

type pastMonthType = {
	year: string;
	month: string[];
};

export const load = (async () => {
	const tasks = await prisma.task.findMany({
		where: {
			isDone: true,
			archive: true,
			trash: false
		},
		orderBy: {
			completedAt: 'desc'
		}
	});

	const archiveTotal = tasks.length; // Debug

	const nulls = tasks.filter((task: Task) => task.completedAt == null);

	if (nulls.length > 0) {
		nulls.forEach((t: Task) => {
			tasks.splice(
				tasks.findIndex((task: Task) => task.id === t.id),
				1
			);
		});
	}

	const today = tasks.filter((task: Task) => {
		if (task.completedAt) {
			return isToday(task.completedAt);
		}
	});

	if (today.length > 0) {
		today.forEach((t: Task) => {
			tasks.splice(
				tasks.findIndex((task: Task) => task.id === t.id),
				1
			);
		});
	}

	const yesterday = tasks.filter((task: Task) => {
		if (task.completedAt) {
			return isYesterday(task.completedAt);
		}
	});

	if (yesterday.length > 0) {
		yesterday.forEach((y: Task) => {
			tasks.splice(
				tasks.findIndex((task: Task) => task.id === y.id),
				1
			);
		});
	}

	const thisMonth = tasks.filter((task: Task) => {
		if (task.completedAt) {
			return isThisMonth(task.completedAt);
		}
	});

	if (thisMonth.length > 0) {
		thisMonth.forEach((m: Task) => {
			tasks.splice(
				tasks.findIndex((task: Task) => task.id === m.id),
				1
			);
		});
	}

	const moreCount = tasks.length;

	const thisYear = tasks.filter((task: Task) => {
		if (task.completedAt) {
			return isThisYear(task.completedAt);
		}
	});

	if (thisYear.length > 0) {
		thisYear.forEach((i: Task) => {
			tasks.splice(
				tasks.findIndex((task: Task) => task.id === i.id),
				1
			);
		});
	}

	const monthOfThisYear = [
		...new Set(
			thisYear.map((task: Task) => (task.completedAt ? format(task.completedAt, 'MMM') : ''))
		)
	];

	const years = [
		...new Set(tasks.map((task: Task) => (task.completedAt ? format(task.completedAt, 'y') : '')))
	];

	const pastMonth: pastMonthType[] = [];

	if (years.length > 0) {
		for (let i = 0; i < years.length; i++) {
			pastMonth.push({
				year: years[i],
				month: [
					...new Set(
						tasks
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

	// Debug
	if (
		archiveTotal ===
		today.length +
			yesterday.length +
			thisMonth.length +
			thisYear.length +
			nulls.length +
			tasks.length
	) {
		console.log(`Result of calculation is: ${true}`);
	} else console.log(`Result of calculation is: ${false}`);

	return {
		today,
		yesterday,
		thisMonth,
		more: moreCount,
		thisYear,
		monthOfThisYear,
		others: tasks,
		nulls,
		pastMonth
	};
}) satisfies PageServerLoad;
