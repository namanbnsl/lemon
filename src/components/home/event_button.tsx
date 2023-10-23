'use client';

import { sendEventSchema } from '~/app/api/events/send/route';
import type { LemonEvent } from '~/types/event';
import axios from 'axios';

import { Button } from '~/components/ui/button';

type Props = {
  projectName: string;
  events: LemonEvent[];
};

const EventButton = (props: Props) => {
  return (
    <Button
      className="mt-4 w-1/6"
      onClick={async () => {
        const result = sendEventSchema.safeParse({
          projectName: props.projectName,
          events: props.events
        });

        if (result.success) {
          await axios.post('/api/events/send', result.data);
        } else {
          console.log(result.error);
        }
      }}
    >
      Send Event
    </Button>
  );
};

export default EventButton;
