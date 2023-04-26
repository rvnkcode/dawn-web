import { router } from '../trpc';
import { inboxRouter } from './inbox';
import { countRouter } from './nav';
import { trashRouter } from './trash';

export const appRouter = router({
	inbox: inboxRouter,
	count: countRouter,
	trash: trashRouter
});

export type AppRouter = typeof appRouter;
