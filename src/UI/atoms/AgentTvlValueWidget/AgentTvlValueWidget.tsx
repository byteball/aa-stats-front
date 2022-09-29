import { FC, memo, useMemo } from 'react';

import { useParams } from 'react-router-dom';

import { useTimeframe } from 'lib/useTimeframe';
import { useGetTvlOverTimeValuesForOneAddressQuery } from 'store/AAstats';
import NeuBox from 'UI/templates/NeuBox/NeuBox';

import ValueWidget from '../ValueWidget/ValueWidget';

const AgentTvlValueWidget: FC = () => {
  const { address = '' } = useParams<{ address: string }>();
  const { from, now } = useTimeframe(2, 'hourly');

  const { data, isFetching } = useGetTvlOverTimeValuesForOneAddressQuery(
    {
      address,
      from,
      to: now,
    },
    { skip: !address }
  );

  const [prev, value] = useMemo(() => data || [0, 0], [data]);

  return (
    <NeuBox>
      <ValueWidget
        isLoading={isFetching}
        title='Total Value Locked'
        trend={prev}
        trendTooltip='TVL compared to the previous period (24h)'
        unit='$'
        value={value}
        shorten
      />
    </NeuBox>
  );
};

export default memo(AgentTvlValueWidget);
