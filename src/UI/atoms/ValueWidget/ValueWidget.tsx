import { FC, memo, MouseEvent, useCallback, useMemo } from 'react';

import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import {
  Box,
  Divider,
  IconButton,
  Skeleton,
  Tooltip,
  Typography,
} from '@mui/material';

import { usd } from 'lib/currency';

import WaterMark from '../WaterMark/WaterMark';
import { styles } from './styles';

const ValueWidget: FC<IValueWidgetProps> = ({
  title,
  value,
  unit,
  shorten,
  trend,
  trendTooltip,
  isLoading,
  isTrendCount,
}) => {
  const stopPropagate = useCallback((e: MouseEvent) => e.stopPropagation(), []);

  const print = useCallback(
    (val: number) => {
      if (unit === '$') {
        return usd(val, 2, shorten);
      }
      return `${val.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}${unit || ''}`;
    },
    [shorten, unit]
  );

  const printValue = useMemo(() => print(value), [print, value]);

  const printTrend = useMemo(() => {
    if (trend && value !== trend) {
      return isTrendCount
        ? print(value - trend)
        : `${(((value - trend) / trend) * 100).toFixed(2)}%`;
    }
    return null;
  }, [isTrendCount, print, trend, value]);

  const isValueGreater = useMemo(
    () => (trend ? value > trend : false),
    [trend, value]
  );

  return (
    <Box sx={styles.root}>
      <Typography sx={styles.title}>{title}</Typography>
      <Divider sx={styles.divider} />
      <Box sx={styles.content} onMouseDown={stopPropagate}>
        <Typography sx={styles.value}>{printValue}</Typography>
        {printTrend && (
          <Tooltip
            disableHoverListener={!trendTooltip}
            title={trendTooltip || false}
            arrow
          >
            <Box sx={styles.trend}>
              <IconButton
                color={isValueGreater ? 'success' : 'error'}
                size='small'
                sx={styles.trendIcon}
              >
                {isValueGreater ? <TrendingUpIcon /> : <TrendingDownIcon />}
              </IconButton>
              <Typography
                color={isValueGreater ? 'success.main' : 'error.main'}
              >
                {printTrend}
              </Typography>
            </Box>
          </Tooltip>
        )}
      </Box>
      {isLoading && (
        <Skeleton animation='wave' sx={styles.skeleton} variant='rectangular' />
      )}
      <WaterMark />
    </Box>
  );
};

export default memo(ValueWidget);
