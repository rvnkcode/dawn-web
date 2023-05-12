import { publicProcedure, router } from '$lib/trpc/trpc';
import { prisma } from '$lib/server/prisma';

export const contactRouter = router({
	getContacts: publicProcedure.query(async () => {
		return await prisma.contact.findMany();
	})
});
