import type { Prisma, Contact } from '@prisma/client';

export async function contact(tx: Prisma.TransactionClient) {
	const test: Contact = {
		id: 1,
		name: 'test',
		activate: true
	};

	const contacts = [test];

	for await (const contact of contacts) {
		await tx.contact.upsert({
			where: {
				id: contact.id
			},
			update: contact,
			create: contact
		});
	}
}
