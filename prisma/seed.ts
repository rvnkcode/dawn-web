import { Prisma, PrismaClient } from '@prisma/client';
import { subDays } from 'date-fns';

const prisma = new PrismaClient();

// TODO: update seed for test cases
const sample: Prisma.TaskCreateInput = {
	title: `This is the sample task.`,
	isDone: false,
	archive: false,
	trash: false
};

const completed: Prisma.TaskCreateInput = {
	title: 'Completed task sample',
	isDone: true,
	archive: false,
	trash: false,
	completedAt: new Date('2023-04-20')
};

const archivedTask: Prisma.TaskCreateInput = {
	title: 'Archived task',
	isDone: true,
	archive: true,
	trash: false,
	completedAt: new Date()
};

const archivedTask4: Prisma.TaskCreateInput = {
	title: 'Archived task yesterday',
	isDone: true,
	archive: true,
	trash: false,
	completedAt: subDays(new Date(), 1)
};

const archivedTask2: Prisma.TaskCreateInput = {
	title: 'Archived task last month',
	isDone: true,
	archive: true,
	trash: false,
	completedAt: new Date('2023-03-05')
};

const archivedTask3: Prisma.TaskCreateInput = {
	title: 'Archived task last year',
	isDone: true,
	archive: true,
	trash: false,
	completedAt: new Date('2022-02-05')
};

const trashedTask: Prisma.TaskCreateInput = {
	title: 'Trashed task',
	isDone: false,
	archive: false,
	trash: true
};

const trashedCompletedTask: Prisma.TaskCreateInput = {
	title: 'Completed task in trash',
	isDone: true,
	archive: false,
	trash: true,
	completedAt: new Date('2023-03-01')
};

const archivedAndTrashedTask: Prisma.TaskCreateInput = {
	title: 'Archive and also trashed task',
	isDone: true,
	archive: true,
	trash: true,
	completedAt: new Date('2022-02-02')
};

const tasks: Prisma.TaskCreateInput[] = [
	sample,
	completed,
	archivedTask,
	archivedTask2,
	archivedTask3,
	archivedTask4,
	trashedTask,
	trashedCompletedTask,
	archivedAndTrashedTask
];

async function main() {
	for (let i = 0; i < tasks.length; i++) {
		await prisma.task.upsert({
			where: { id: i + 1 },
			update: tasks[i],
			create: tasks[i]
		});
	}
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (error) => {
		console.error(error);
		await prisma.$disconnect();
		process.exit(1);
	});
