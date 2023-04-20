import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// TODO: update seed for test cases
const sample: Prisma.TaskCreateInput = {
	title: `This is the sample task.`,
	isDone: false,
	archive: false,
	trash: false
};

const archivedTask: Prisma.TaskCreateInput = {
	title: 'Archived task',
	isDone: true,
	archive: true,
	trash: false,
	completedAt: new Date()
};

const trashedTask: Prisma.TaskCreateInput = {
	title: 'Trashed task',
	isDone: false,
	archive: false,
	trash: true
};

const tasks: Prisma.TaskCreateInput[] = [sample, archivedTask, trashedTask];

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
