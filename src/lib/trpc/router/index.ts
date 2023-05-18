import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import { router } from '../trpc';
import { archiveRouter } from './archive';
import { inboxRouter } from './inbox';
import { listRouter } from './list';
import { countRouter } from './nav';
import { taskRouter } from './task';
import { trashRouter } from './trash';
import { contactRouter } from './contact';
import { waitingForRouter } from './waitingFor';
import { todayRouter } from './today';

export const appRouter = router({
	inbox: inboxRouter,
	count: countRouter,
	trash: trashRouter,
	archive: archiveRouter,
	task: taskRouter,
	list: listRouter,
	contact: contactRouter,
	waitingFor: waitingForRouter,
	today: todayRouter
});

export type AppRouter = typeof appRouter;
export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;
