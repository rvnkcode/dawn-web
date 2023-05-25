import { parse } from 'date-fns';
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

export const zTaskCreateInput = z.object({
	title: z.string(),
	startedAt: z
		.string()
		.optional()
		.transform((arg) =>
			arg == undefined || (arg !== undefined && arg?.length < 1)
				? null
				: parse(arg, 'yyyy-MM-dd', new Date())
		),
	comments: z.string().transform((arg) => (arg?.length < 1 ? undefined : arg)),
	rawUrls: z.string().optional(),
	url: z.string().url().optional(),
	allocatedTo: z
		.string()
		.optional()
		.transform((arg) => (arg != null && arg?.length < 1 ? undefined : arg)),
	status: z.string().optional()
});

export const zTaskUpdateInput = z
	.object({
		id: z.coerce.number().int(),
		title: z.string(),
		startedAt: z
			.string()
			.optional()
			.transform((arg) =>
				arg == undefined || (arg !== undefined && arg?.length < 1)
					? null
					: parse(arg, 'yyyy-MM-dd', new Date())
			),
		comments: z.string().transform((arg) => (arg?.length < 1 ? null : arg)),
		rawUrls: z.string().optional(),
		url: z.string().url().optional(),
		allocatedTo: z
			.string()
			.optional()
			.transform((arg) => (arg != null && arg?.length < 1 ? undefined : arg)),
		completedAt: z.coerce.date().optional(),
		status: z.string().optional()
	})
	.refine((data) => {
		if (data.completedAt && data.startedAt && data.completedAt < data.startedAt) {
			return false;
		}
		return true;
	});
