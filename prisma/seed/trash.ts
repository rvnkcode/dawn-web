import type { Prisma, Task } from '@prisma/client';

const date = new Date();

const trashCondition = {
	trash: true,
	createdAt: date,
	urls: null,
	comments: null
};

export async function trash(tx: Prisma.TransactionClient) {
	const trashed: Task = {
		id: 3,
		title: 'Trashed task',
		isDone: false,
		completedAt: null,
		allocatedTo: null,
		archive: false,
		...trashCondition
	};

	const trashCompleted: Task = {
		id: 4,
		title: 'Completed task in trash',
		isDone: true,
		completedAt: date,
		allocatedTo: null,
		archive: false,
		...trashCondition
	};

	const trashArchived: Task = {
		id: 5,
		title: 'Archive and also trashed task',
		isDone: true,
		completedAt: date,
		allocatedTo: null,
		archive: true,
		...trashCondition
	};

	const trashAllocated: Task = {
		id: 6,
		title: 'Trashed allocated task',
		isDone: false,
		completedAt: null,
		allocatedTo: 'test',
		archive: false,
		...trashCondition
	};

	const tasks = [trashed, trashCompleted, trashArchived, trashAllocated];

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
