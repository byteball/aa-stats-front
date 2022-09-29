/* eslint-disable camelcase */
import { FC, memo, MouseEvent, useCallback, useMemo } from 'react';

import { Box, Divider, Link, Skeleton, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import { usd } from 'lib/currency';
import { useTimeframe } from 'lib/useTimeframe';
import { useAppSelector } from 'store';
import { useGetMostActiveAgentsQuery } from 'store/AAstats';
import { descriptionByAddressSelector } from 'store/Obyte';
import NeuBox from 'UI/templates/NeuBox/NeuBox';

import WaterMark from '../WaterMark/WaterMark';
import { styles } from './styles';

const MostActiveAgentsWidget: FC = () => {
  const getDefinition = useAppSelector(descriptionByAddressSelector);
  const { from, to } = useTimeframe(1, 'hourly');
  const stopPropagate = useCallback((e: MouseEvent) => e.stopPropagation(), []);
  const { data, isFetching } = useGetMostActiveAgentsQuery({
    from,
    to,
    timeframe: 'hourly',
    limit: 3,
  });

  const mostActiveAgents = useMemo(
    () =>
      Array.isArray(data)
        ? data.map((ad) => ({
            ...ad,
            title: getDefinition(ad.address),
            usd_amount_in: usd(ad.usd_amount_in, 2, true),
          }))
        : [],
    [data, getDefinition]
  );

  return (
    <NeuBox>
      <Box sx={styles.root}>
        <Box sx={styles.head}>
          <Typography sx={styles.title}>Most Active Agents.</Typography>
          <Typography color='secondary.dark' sx={styles.title}>
            Turnover 24h
          </Typography>
        </Box>
        <Divider sx={styles.divider} />
        <Box sx={styles.content} onMouseDown={stopPropagate}>
          {mostActiveAgents.map(({ title, address, usd_amount_in }, i) => (
            <Link
              key={address}
              component={RouterLink}
              sx={styles.link}
              to={`aa/${address}`}
            >
              <Typography sx={styles.index}>{`${i + 1}.`}</Typography>
              <Box sx={styles.titleBox}>
                <Typography sx={styles.addressTitle}>{title}</Typography>
              </Box>
              <Typography
                color='secondary.dark'
                fontSize='inherit'
                sx={styles.value}
              >
                {usd_amount_in}
              </Typography>
            </Link>
          ))}
        </Box>
        <WaterMark />
        {isFetching && (
          <Skeleton
            animation='wave'
            sx={styles.skeleton}
            variant='rectangular'
          />
        )}
      </Box>
    </NeuBox>
  );
};

export default memo(MostActiveAgentsWidget);
