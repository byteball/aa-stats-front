import { FC, memo, useCallback, useMemo } from 'react';

import { ResponsiveLine } from '@nivo/line';

import { usd } from 'lib/currency';
import { shortenNumber } from 'lib/shortenNumber';
import { useMedia } from 'lib/useMedia';
import { useAppSelector } from 'store';
import { darkModeSelector } from 'store/UI';

import LineChartTooltip from '../LineChartTooltip/LineChartTooltip';
import { ILineChartProps } from './types';

const LineChart: FC<ILineChartProps> = ({
  data,
  lineWidth = 1.5,
  small,
  precision = 'day',
  xType = 'time',
  yType = 'currency',
  fullDaysBetweenStartAndEnd,
  serieLength,
}) => {
  const { isMobile, isTablet } = useMedia();
  const darkMode = useAppSelector(darkModeSelector);

  const getFormatYAxisValuesFabric = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (value: any) =>
      yType === 'currency' ? usd(+value, 2, true) : shortenNumber(+value, 2),
    [yType]
  );

  const xFormat = useMemo(() => {
    if (xType === 'time') {
      if (precision === 'hour') return 'time:%x %H:%M';

      return 'time:%x';
    }

    return undefined;
  }, [precision, xType]);

  const formatDatesX = useMemo(() => {
    if (xType === 'linear') {
      return { tickValues: undefined, format: undefined };
    }
    if (precision === 'hour') {
      if (fullDaysBetweenStartAndEnd === 1)
        return { tickValues: 'every 3 hour', format: '%H:%M' };
      if (fullDaysBetweenStartAndEnd > 1 && fullDaysBetweenStartAndEnd < 8)
        return { tickValues: 'every 30 hour', format: '%b %d' };
      return { tickValues: 'every 4 day', format: '%b %d' };
    }
    if (fullDaysBetweenStartAndEnd <= 30) {
      if (fullDaysBetweenStartAndEnd === 0)
        return { tickValues: 'every 30 hour', format: '%b %d' };
      if (isTablet) {
        return { tickValues: 'every 5 day', format: '%b %d' };
      }
      if (isMobile) {
        return { tickValues: 'every 10 day', format: '%b %d' };
      }
      return { tickValues: 'every 5 day', format: '%b %d' };
    }
    if (fullDaysBetweenStartAndEnd > 30 && fullDaysBetweenStartAndEnd <= 365) {
      if (isMobile) {
        return { tickValues: 'every 2 month', format: '%b' };
      }
      return { tickValues: 'every month', format: '%b' };
    }

    return { tickValues: 'every year', format: '%Y' };
  }, [fullDaysBetweenStartAndEnd, isMobile, isTablet, precision, xType]);

  const theme = useMemo(
    () => ({
      textColor: darkMode ? '#fff' : 'rgba(0,0,0,.6)',
      fontSize: 14,
      fontFamily: 'Poppins',
      axis: {
        ticks: {
          line: {
            strokeWidth: 0,
          },
        },
      },
      grid: {
        line: {
          stroke: darkMode ? '#1a223f' : '#ebebeb',
          strokeWidth: 1,
        },
      },
      crosshair: {
        line: {
          stroke: darkMode ? '#fff' : 'rgba(0,0,0,.6)',
          strokeWidth: 2,
        },
      },
    }),
    [darkMode]
  );

  const colors = useMemo(() => {
    const cls = data.map((d) => {
      if ('color' in d) {
        return d.color;
      }
      return undefined;
    });
    if (cls.some((c) => c == null)) {
      return undefined;
    }
    return cls;
  }, [data]);

  const yValuesCount = useMemo(() => (yType === 'currency' ? 5 : 4), [yType]);

  return (
    <ResponsiveLine
      axisRight={null}
      axisTop={null}
      colors={colors}
      curve='linear'
      data={data}
      enableGridX={false}
      enableGridY={!small}
      enablePoints={serieLength === 1}
      gridYValues={yValuesCount}
      lineWidth={lineWidth}
      pointSize={lineWidth * 3}
      theme={theme}
      tooltip={LineChartTooltip}
      xFormat={xFormat}
      yFormat={yType === 'currency' ? '<-$.2f' : '>-.2~f'}
      axisBottom={
        small || isMobile
          ? null
          : {
              tickValues: formatDatesX.tickValues,
              tickSize: 0,
              tickPadding: 7,
              format: formatDatesX.format,
            }
      }
      axisLeft={
        small || isMobile
          ? null
          : {
              tickSize: 0,
              tickPadding: 20,
              format: getFormatYAxisValuesFabric,
              tickValues: yValuesCount,
            }
      }
      margin={
        small || isMobile
          ? {
              right: 20,
            }
          : {
              top: 20,
              right: 35,
              bottom: 25,
              left: 70,
            }
      }
      xScale={{
        type: xType,
        precision,
      }}
      yScale={{
        type: 'linear',
        stacked: false,
        min: 'auto',
        max: 'auto',
      }}
      isInteractive
      useMesh
    />
  );
};

export default memo(LineChart);
