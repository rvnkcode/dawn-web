import { router } from '../trpc';
import { archiveRouter } from './archive';
import { inboxRouter } from './inbox';
import { countRouter } from './nav';
import { taskRouter } from './task';
import { trashRouter } from './trash';

export const appRouter = router({
	inbox: inboxRouter,
	count: countRouter,
	trash: trashRouter,
	archive: archiveRouter,
	task: taskRouter
});

export type AppRouter = typeof appRouter;
