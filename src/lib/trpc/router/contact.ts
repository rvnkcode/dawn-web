import { publicProcedure, router } from '$lib/trpc/trpc';
import { prisma } from '$lib/server/prisma';
import { z } from 'zod';

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
	}),

	deactivateSelectedContacts: publicProcedure.input(z.number().array()).mutation(async (opts) => {
		const { input } = opts;
		await prisma.contact.updateMany({
			where: {
				id: {
					in: input
				},
				activate: true
			},
			data: {
				activate: false
			}
		});
	}),

	activateSelectedContacts: publicProcedure.input(z.number().array()).mutation(async (opts) => {
		const { input } = opts;
		await prisma.contact.updateMany({
			where: {
				id: {
					in: input
				},
				activate: false
			},
			data: {
				activate: true
			}
		});
	})
});
