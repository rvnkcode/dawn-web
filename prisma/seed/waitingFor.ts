import type { Prisma, Task } from '@prisma/client';
import { subDays } from 'date-fns';

const date = new Date();

const waitingForCondition = {
	archive: false,
	trash: false,
	createdAt: date,
	urls: null,
	comments: null,
	startedAt: null,
	isDone: false,
	completedAt: null,
	allocatedTo: `test`
};

export async function waitingFor(tx: Prisma.TransactionClient) {
	const allocated: Task = {
		id: 13,
		title: `Allocated task sample`,
		...waitingForCondition
	};

	const allocatedAndDone: Task = {
		id: 17,
		title: `Allocated and done`,
		...waitingForCondition,
		isDone: true,
		completedAt: date
	};

	const startedAndAllocated: Task = {
		id: 18,
		title: `Started and allocated`,
		...waitingForCondition,
		startedAt: date
	};

	const startedAndAllocated2: Task = {
		id: 19,
		title: `Started and allocated yesterday`,
		...waitingForCondition,
		startedAt: subDays(date, 1)
	};

	const tasks = [allocated, allocatedAndDone, startedAndAllocated, startedAndAllocated2];

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
