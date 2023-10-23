import type { LemonEvent } from '~/types/event';

type Props = {
  data: LemonEvent[];
};

const DataView = (props: Props) => {
  const actionCountMap = new Map<string, number>();

  props.data.forEach((item) => {
    const action = item.action;
    actionCountMap.set(action, (actionCountMap.get(action) ?? 0) + 1);
  });

  const outputArray = Array.from(actionCountMap, ([action, count]) => ({
    action,
    count
  }));

  return <div className="mt-6"></div>;
};

export default DataView;
