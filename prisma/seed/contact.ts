import type { Contact, Prisma } from '@prisma/client';

export async function contact(tx: Prisma.TransactionClient) {
	const test: Contact = {
		id: 1,
		name: 'test',
		activate: true
	};

	const disabled: Contact = {
		id: 2,
		name: 'disabled contact',
		activate: false
	};

	const contacts = [test, disabled];

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
