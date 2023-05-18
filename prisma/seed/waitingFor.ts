import type { Prisma, Task } from '@prisma/client';

const date = new Date();

const waitingForCondition = {
	archive: false,
	trash: false,
	createdAt: date,
	urls: null,
	comments: null,
	startedAt: null
};

export async function waitingFor(tx: Prisma.TransactionClient) {
	const allocated: Task = {
		id: 13,
		title: `Allocated task sample`,
		isDone: false,
		completedAt: null,
		allocatedTo: 'test',
		...waitingForCondition
	};

	const tasks = [allocated];

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
