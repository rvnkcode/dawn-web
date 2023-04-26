import { router } from '../trpc';
import { archiveRouter } from './archive';
import { inboxRouter } from './inbox';
import { listRouter } from './list';
import { countRouter } from './nav';
import { taskRouter } from './task';
import { trashRouter } from './trash';

export const appRouter = router({
	inbox: inboxRouter,
	count: countRouter,
	trash: trashRouter,
	archive: archiveRouter,
	task: taskRouter,
	list: listRouter
});

export type AppRouter = typeof appRouter;
