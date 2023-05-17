import type { Prisma, Task } from '@prisma/client';

import { subDays } from 'date-fns';

const today = new Date();

const archiveCondition = {
	isDone: true,
	archive: true,
	urls: null,
	comments: null,
	createdAt: today,
	trash: false
};

export async function archive(tx: Prisma.TransactionClient) {
	const archivedToday: Task = {
		id: 7,
		title: 'Archived at today',
		allocatedTo: null,
		...archiveCondition,
		completedAt: today
	};

	const archivedYesterday: Task = {
		id: 8,
		title: 'Archived at yesterday',
		allocatedTo: null,
		...archiveCondition,
		completedAt: subDays(today, 1)
	};

	const archivedThisMonth: Task = {
		id: 9,
		title: 'Archived this month',
		allocatedTo: null,
		...archiveCondition,
		completedAt: subDays(today, 7)
	};

	const testCompletedAtTime: Task = {
		id: 10,
		title: 'Archived task',
		allocatedTo: null,
		...archiveCondition,
		comments: 'Should display completed date Mar 1 at Asia/Tokyo time zone',
		completedAt: new Date('2023-02-28T23:30:00')
	};

	const archivedLastYear: Task = {
		id: 11,
		title: 'Archived at last year',
		allocatedTo: null,
		...archiveCondition,
		completedAt: new Date('2022-02-02')
	};

	const archivedAndAllocated: Task = {
		id: 12,
		title: 'Archived allocated task',
		allocatedTo: 'test',
		...archiveCondition,
		completedAt: today
	};

	const tasks = [
		archivedToday,
		archivedYesterday,
		archivedThisMonth,
		testCompletedAtTime,
		archivedLastYear,
		archivedAndAllocated
	];

	for await (const task of tasks) {
		await tx.task.upsert({
			where: {
				id: task.id
			},
			update: task,
			create: task
		});
	}
}
