import { parse } from 'date-fns';
import * as z from 'zod';

export const zPathEnum = z.enum(['/inbox', '/waiting_for']);

export const zTaskCreateInput = z.object({
	title: z.string(),
	startedAt: z
		.string()
		.optional()
		.transform((arg) =>
			arg != null && arg?.length < 1 ? null : parse(arg ?? '', 'yyyy-MM-dd', new Date())
		),
	comments: z.string().transform((arg) => (arg?.length < 1 ? undefined : arg)),
	rawUrls: z.string().optional(),
	url: z.string().url().optional(),
	allocatedTo: z
		.string()
		.optional()
		.transform((arg) => (arg != null && arg?.length < 1 ? undefined : arg))
});

export const zTaskUpdateInput = z
	.object({
		id: z.coerce.number().int(),
		title: z.string(),
		startedAt: z
			.string()
			.optional()
			.transform((arg) =>
				arg != null && arg?.length < 1 ? null : parse(arg ?? '', 'yyyy-MM-dd', new Date())
			),
		comments: z.string().transform((arg) => (arg?.length < 1 ? null : arg)),
		rawUrls: z.string().optional(),
		url: z.string().url().optional(),
		allocatedTo: z
			.string()
			.optional()
			.transform((arg) => (arg != null && arg?.length < 1 ? undefined : arg)),
		completedAt: z.coerce.date().optional()
	})
	// Condition of correct(what data should be)
	.refine((data) => data.completedAt && data.startedAt && data.completedAt >= data.startedAt, {
		message: 'Completion date cannot be earlier than the started date',
		path: ['startedAt', 'completedAt']
	});
