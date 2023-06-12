import * as z from 'zod';

export const zPathEnum = z.enum([
	'/',
	'/today',
	'/upcoming',
	'/anytime',
	'/someday',
	'/waiting_for',
	'/archive',
	'/trash'
]);
export type zPathType = z.infer<typeof zPathEnum>;

export const zTaskSchema = z.object({
	title: z.string().min(1),
	comments: z
		.string()
		.optional()
		.transform((arg) => (arg != null && arg?.length < 1 ? undefined : arg)),
	startedAt: z.coerce.date().optional(),
	url: z.string().url().optional(),
	allocatedTo: z.string().min(1).optional()
});
