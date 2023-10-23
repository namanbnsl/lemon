import type { LemonEvent } from '~/types/event';
import axios from 'axios';

const sendEvents = async ({
  events,
  projectName,
  key
}: {
  events: LemonEvent[];
  projectName: string;
  key: string;
}) => {
  const date = new Date();

  let result = '';

  for (const event of events) {
    event.date = date.toISOString();
    event.projectName = projectName;

    result += JSON.stringify(event) + '\n';
  }

  // Remove the trailing newline character if needed
  if (result.endsWith('\n')) {
    result = result.slice(0, -1);
  }

  await axios.post(`https://api.tinybird.co/v0/events?name=lemon`, result, {
    headers: {
      Authorization: `Bearer ${key}`
    }
  });
};

export { sendEvents };
