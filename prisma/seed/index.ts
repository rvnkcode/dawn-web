import { PrismaClient } from '@prisma/client';
import { contact } from './contact';
import { inbox } from './inbox';
import { trash } from './trash';
import { archive } from './archive';

const prisma = new PrismaClient();

async function main() {
	await prisma.$transaction(async (tx) => {
		await Promise.all([contact(tx), inbox(tx), trash(tx), archive(tx)]);
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
