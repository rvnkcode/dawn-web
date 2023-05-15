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
	}),

	updateContactName: publicProcedure
		.input(z.object({ id: z.number(), name: z.string().min(1) }))
		.mutation(async (opts) => {
			const { input } = opts;
			await prisma.contact.update({
				where: {
					id: input.id
				},
				data: {
					name: input.name
				}
			});
		}),

	deleteContact: publicProcedure.input(z.number()).mutation(async (opts) => {
		const { input } = opts;
		await prisma.contact.delete({
			where: {
				id: input
			}
		});
	})
});
