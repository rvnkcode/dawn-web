import { publicProcedure, router } from '$lib/trpc/trpc';
import { prisma } from '$lib/server/prisma';

export const contactRouter = router({
	getContacts: publicProcedure.query(async () => {
		return await prisma.contact.findMany({
			where: {
				activate: true
			}
		});
	}),

	getAllContacts: publicProcedure.query(async () => {
		const [disabled, activated] = await Promise.all([
			await prisma.contact.findMany({
				where: {
					activate: false
				}
			}),

			await prisma.contact.findMany({
				where: {
					activate: true
				}
			})
		]);

		return { disabled, activated };
	})
});
