import type { Prisma, Task } from '@prisma/client';

const date = new Date();

const somedayCondition = {
	archive: false,
	trash: false,
	allocatedTo: null,
	createdAt: date,
	startedAt: null,
	status: 'someday',
	urls: null,
	comments: null
};

export async function someday(tx: Prisma.TransactionClient) {
	const someday: Task = {
		id: 20,
		title: 'Someday task',
		isDone: false,
		completedAt: null,
		...somedayCondition
	};

	const somedayCompleted: Task = {
		id: 21,
		title: 'Someday completed',
		isDone: true,
		completedAt: date,
		...somedayCondition
	};

	await Promise.all(
		[someday, somedayCompleted].map(async (task) => {
			await tx.task.upsert({
				where: {
					id: task.id
				},
				update: task,
				create: task
			});
		})
	);
}
