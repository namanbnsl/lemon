import { z } from 'zod';

const lemonEventZod = z.object({
  projectName: z.string().optional(),
  name: z.string(),
  action: z.string(),
  date: z.string().optional()
});

type LemonEvent = z.infer<typeof lemonEventZod>;

export { lemonEventZod };
export type { LemonEvent };
