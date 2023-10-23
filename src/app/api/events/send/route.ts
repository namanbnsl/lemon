import { env } from '~/env';
import { sendEvents } from '~/lib/sendEvents';
import { lemonEventZod } from '~/types/event';
import { NextResponse } from 'next/server';
import { z } from 'zod';

export const sendEventSchema = z.object({
  projectName: z.string(),
  events: z.array(lemonEventZod)
});

export async function POST(req: Request) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const body = await req.json();

  const validationResult = sendEventSchema.safeParse(body);

  if (validationResult.success) {
    try {
      const validData = validationResult.data;

      await sendEvents({
        events: validData.events,
        projectName: validData.projectName,
        key: env.TINYBIRD_KEY
      });

      return NextResponse.json({ msg: 'success' });
    } catch (err) {
      console.log(err);
      return NextResponse.json({ msg: 'error' }, { status: 500 });
    }
  } else {
    return NextResponse.json({ msg: 'invalid body' }, { status: 500 });
  }
}
