import { FC, memo, useMemo } from 'react';

import { useParams } from 'react-router-dom';

import { useTimeframe } from 'lib/useTimeframe';
import { useGetUsdInValuesForOneAddressQuery } from 'store/AAstats';
import NeuBox from 'UI/templates/NeuBox/NeuBox';

import ValueWidget from '../ValueWidget/ValueWidget';

const AgentTurnoverValueWidget: FC = () => {
  const { address = '' } = useParams<{ address: string }>();
  const { from, to } = useTimeframe(2, 'hourly');
  const { data, isFetching } = useGetUsdInValuesForOneAddressQuery(
    {
      from,
      to,
      timeframe: 'hourly',
      address,
    },
    { skip: !address }
  );

  const { prev = 0, value = 0 } = useMemo(
    () => data || { prev: 0, value: 0 },
    [data]
  );

  return (
    <NeuBox>
      <ValueWidget
        isLoading={isFetching}
        title='Turnover 24h'
        trend={prev}
        trendTooltip='Turnover compared to the previous period (24h)'
        unit='$'
        value={value}
        shorten
      />
    </NeuBox>
  );
};

export default memo(AgentTurnoverValueWidget);
