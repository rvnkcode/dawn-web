import { PrismaClient } from '@prisma/client';

import { archive } from './archive';
import { contact } from './contact';
import { inbox } from './inbox';
import { someday } from './someday';
import { today } from './today';
import { trash } from './trash';
import { waitingFor } from './waitingFor';

const prisma = new PrismaClient();

async function main() {
	await prisma.$transaction(async (tx) => {
		await Promise.all([
			contact(tx),
			inbox(tx),
			trash(tx),
			archive(tx),
			waitingFor(tx),
			today(tx),
			someday(tx)
		]);
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
