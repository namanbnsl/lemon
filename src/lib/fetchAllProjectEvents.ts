import type { LemonEvent } from '~/types/event';
import axios from 'axios';

const fetchAllProjectEvents = async ({
  tinybirdKey,
  projectName
}: {
  tinybirdKey: string;
  projectName: string;
}) => {
  const url = new URL(
    `https://api.tinybird.co/v0/pipes/untitled_pipe_2492.json`
  );

  url.searchParams.append('project_name', projectName);

  const result = await axios.get(url.toString(), {
    headers: { Authorization: `Bearer ${tinybirdKey}` }
  });

  if (!result.data) {
    console.error(`there is a problem running the query: ${result.data}`);
  } else {
    const res = result.data as {
      meta: { name: string; type: string }[];
      // data: {
      //   action: string;
      //   date: string;
      //   name: string;
      //   projectName: string;
      // }[];
      data: LemonEvent[];
      rows: number;
      statistics: { elapsed: number; rows_read: number; bytes_read: number };
    };

    return res.data;
  }
};

export { fetchAllProjectEvents };
