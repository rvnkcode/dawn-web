import { Prisma, Task } from '@prisma/client';
import { subDays } from 'date-fns';

const date = new Date();

const todayCondition = {
	archive: false,
	trash: false,
	allocatedTo: null,
	createdAt: date,
	isDone: false,
	completedAt: null,
	urls: null,
	comments: null,
	status: null
};

export async function today(tx: Prisma.TransactionClient) {
	const today: Task = {
		id: 14,
		title: `Today task sample`,
		startedAt: date,
		...todayCondition
	};

	const yesterday: Task = {
		id: 15,
		title: `Started at yesterday`,
		startedAt: subDays(date, 1),
		...todayCondition
	};

	const startedAndDone: Task = {
		id: 16,
		title: `Started and done task`,
		startedAt: date,
		...todayCondition,
		isDone: true,
		completedAt: date
	};

	const tasks = [today, yesterday, startedAndDone];

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
