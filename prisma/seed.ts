import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const sample: Prisma.TaskCreateInput = {
	title: `This is the sample task.`,
	isDone: false,
	archive: false
};

async function main() {
	await prisma.task.upsert({
		where: {
			id: 1
		},
		update: sample,
		create: sample
	});
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
