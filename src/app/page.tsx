import { env } from '~/env';
import { fetchAllProjectEvents } from '~/lib/fetchAllProjectEvents';

import DataView from '~/components/home/data_view';
import EventButton from '~/components/home/event_button';
import { ThemeToggle } from '~/components/ui/theme-toggle';

const HomePage = async () => {
  const data = await fetchAllProjectEvents({
    tinybirdKey: env.TINYBIRD_KEY,
    projectName: 'testing-lemon-analytics'
  });

  return (
    <div className="p-6 ">
      <h2>Home Page</h2>

      <div className="mt-4 w-full">
        <ThemeToggle />
      </div>

      <EventButton
        projectName={'testing-lemon-analytics'}
        events={[
          { name: 'naman', action: 'view' },
          { name: 'session_start', action: 'view' }
        ]}
      />

      {data ? <DataView data={data} /> : <span>No Events</span>}
    </div>
  );
};

export default HomePage;
