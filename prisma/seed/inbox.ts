import type { Prisma, Task } from '@prisma/client';

const date = new Date();

const inboxCondition = {
	archive: false,
	trash: false,
	allocatedTo: null,
	createdAt: date,
	startedAt: null,
	status: null
};

export async function inbox(tx: Prisma.TransactionClient) {
	const sample: Task = {
		id: 1,
		title: `This is the sample task.`,
		isDone: false,
		completedAt: null,
		...inboxCondition,
		urls: `https://github.com/users/rvnkcode/projects/3/views/1,https://github.com/rvnkcode/dawn-web`,
		comments: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pharetra massa massa ultricies mi quis. Velit ut tortor pretium viverra suspendisse. Fringilla est ullamcorper eget nulla facilisi etiam. Ac turpis egestas sed tempus urna. At imperdiet dui accumsan sit. Felis bibendum ut tristique et. Tellus rutrum tellus pellentesque eu. Tristique magna sit amet purus gravida quis blandit turpis cursus. Porta lorem mollis aliquam ut porttitor leo a diam sollicitudin. Consectetur lorem donec massa sapien faucibus et molestie ac. Lacus laoreet non curabitur gravida arcu ac.`
	};

	const completed: Task = {
		id: 2,
		title: 'Completed task sample',
		isDone: true,
		completedAt: date,
		...inboxCondition,
		urls: null,
		comments: null
	};

	const tasks = [sample, completed];

	for await (const task of tasks) {
		await tx.task.upsert({
			where: {
				id: task.id
			},
			update: task,
			create: task
		});
	}
}
