import { Prisma, Task } from '@prisma/client';

const date = new Date();

const todayCondition = {
	archive: false,
	trash: false,
	allocatedTo: null,
	createdAt: date,
	isDone: false,
	completedAt: null,
	urls: null,
	comments: null
};

export async function today(tx: Prisma.TransactionClient) {
	const today: Task = {
		id: 14,
		title: `Today task sample`,
		startedAt: date,
		...todayCondition
	};

	const tasks = [today];

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
