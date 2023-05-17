import * as z from 'zod';

export const zPathEnum = z.enum(['/inbox', '/waiting_for']);
