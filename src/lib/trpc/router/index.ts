import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';

import { router } from '../trpc';
import { anytimeRouter } from './anytime';
import { archiveRouter } from './archive';
import { contactRouter } from './contact';
import { inboxRouter } from './inbox';
import { listRouter } from './list';
import { countRouter } from './nav';
import { somedayRouter } from './someday';
import { taskRouter } from './task';
import { todayRouter } from './today';
import { trashRouter } from './trash';
import { upcomingRouter } from './upcoming';
import { waitingForRouter } from './waitingFor';

export const appRouter = router({
	inbox: inboxRouter,
	count: countRouter,
	trash: trashRouter,
	archive: archiveRouter,
	task: taskRouter,
	list: listRouter,
	contact: contactRouter,
	waitingFor: waitingForRouter,
	today: todayRouter,
	upcoming: upcomingRouter,
	someday: somedayRouter,
	anytime: anytimeRouter
});

export type AppRouter = typeof appRouter;
export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;
