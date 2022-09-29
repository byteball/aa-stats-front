import { FC, memo, useMemo } from 'react';

import { useTimeframe } from 'lib/useTimeframe';
import { useGetTotalTvlValuesQuery } from 'store/AAstats';
import NeuBox from 'UI/templates/NeuBox/NeuBox';

import ValueWidget from '../ValueWidget/ValueWidget';

const TvlValueWidget: FC = () => {
  const { from, now } = useTimeframe(2, 'hourly');

  const { data, isFetching } = useGetTotalTvlValuesQuery({
    from,
    to: now,
  });

  const [prev, value] = useMemo(() => {
    if (data && data.length === 2) {
      return data.map((d) => d.usd_balance);
    }
    return [0, 0];
  }, [data]);

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

export default memo(TvlValueWidget);
