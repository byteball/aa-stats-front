/* eslint-disable camelcase */
import { FC, memo, useEffect, useMemo, useRef, useState } from 'react';

import ExploreIcon from '@mui/icons-material/Explore';
import GitHubIcon from '@mui/icons-material/GitHub';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { Box, Link, Typography, IconButton, Tooltip } from '@mui/material';
import { useParams } from 'react-router-dom';

import {
  explorerAnalyticsClickEvent,
  homepageAnalyticsClickEvent,
  githubAnalyticsClickEvent,
} from 'lib/analytics';
import { useMedia } from 'lib/useMedia';
import { useAppDispatch, useAppSelector } from 'store';
import {
  descriptionByAddressSelector,
  obyteApi,
  safetyDefinitionByAddressSelector,
} from 'store/Obyte';

import { styles } from './styles';

const AgentInfoWidget: FC = () => {
  const ref = useRef<HTMLHeadingElement | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const { address = '' } = useParams<{ address: string }>();
  const dispatch = useAppDispatch();
  const dd = useAppSelector(safetyDefinitionByAddressSelector);
  const getDescription = useAppSelector(descriptionByAddressSelector);
  const { isPortable } = useMedia();

  const { homepage_url = '', source_url = '' } = useMemo(
    () => dd(address),
    [address, dd]
  );

  const description = useMemo(
    () => getDescription(address),
    [address, getDescription]
  );

  const subtitle = useMemo(
    () => (address !== description ? address : null),
    [address, description]
  );

  useEffect(() => {
    if (subtitle === null) {
      dispatch(obyteApi.util.prefetch('getDefinitions', [address], {}));
    }
  }, [address, dispatch, subtitle]);

  useEffect(() => {
    if (ref && ref.current) {
      const { offsetWidth, scrollWidth } = ref.current;
      if (offsetWidth < scrollWidth) setShowTooltip(true);
      else setShowTooltip(false);
    }
  }, [address]);

  return (
    <Box sx={styles.root}>
      <Box sx={styles.titleBox}>
        <Tooltip placement='bottom-end' title={showTooltip ? description : ''}>
          <Typography ref={ref} component='h1' sx={styles.title}>
            {description}
          </Typography>
        </Tooltip>
        {subtitle && (
          <Typography component='h2' sx={styles.subtitle}>
            {subtitle}
          </Typography>
        )}
      </Box>

      <Box sx={styles.linksWrapper}>
        <Link
          component={isPortable ? IconButton : 'a'}
          href={`https://explorer.obyte.org/#${address}`}
          sx={styles.link}
          target='_blank'
          onClick={explorerAnalyticsClickEvent}
        >
          <ExploreIcon />
          <Typography sx={styles.linkText}>Explorer</Typography>
        </Link>
        {homepage_url && (
          <Link
            component={isPortable ? IconButton : 'a'}
            href={homepage_url}
            sx={styles.link}
            target='_blank'
            onClick={homepageAnalyticsClickEvent}
          >
            <HomeRoundedIcon />
            <Typography sx={styles.linkText}>Homepage</Typography>
          </Link>
        )}
        {source_url && (
          <Link
            component={isPortable ? IconButton : 'a'}
            href={source_url}
            sx={styles.link}
            target='_blank'
            onClick={githubAnalyticsClickEvent}
          >
            <GitHubIcon />
            <Typography sx={styles.linkText}>GitHub</Typography>
          </Link>
        )}
      </Box>
    </Box>
  );
};

export default memo(AgentInfoWidget);
