import { router } from '../trpc';
import { inboxRouter } from './inbox';
import { countRouter } from './nav';

export const appRouter = router({
	inbox: inboxRouter,
	count: countRouter
});

export type AppRouter = typeof appRouter;
