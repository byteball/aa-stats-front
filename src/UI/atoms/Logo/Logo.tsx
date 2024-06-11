import { FC, memo, useCallback, useMemo } from 'react';

import { Box, ButtonBase, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

import { useStateUrlParams } from 'lib/useStateUrlParams';
import { useAppSelector } from 'store';
import { initialHomeSearchParamsSelector } from 'store/UI';

import { styles } from './styles';

const Logo: FC<ILogoProps> = ({ title, subtitle }) => {
  const nav = useNavigate();
  const { pathname } = useLocation();
  const params = useAppSelector(initialHomeSearchParamsSelector);
  const { getParamsString } = useStateUrlParams();

  const paramsString = useMemo(
    () => getParamsString(params),
    [getParamsString, params]
  );

  const goHome = useCallback(() => {
    nav(`/?${paramsString}`);
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [nav, paramsString]);

  const typeOfWrapComponent = pathname === '/' ? 'h1' : 'div';

  return (
    <ButtonBase sx={styles.root} onClick={goHome}>
      <Box sx={styles.logo} />
      {title && (
        <Box sx={styles.credits}>
          <Typography component={typeOfWrapComponent} sx={styles.title}>
            <span>{title}</span>
            {subtitle && (
              <Typography sx={styles.subtitle}>{subtitle}</Typography>
            )}
          </Typography>
        </Box>
      )}
    </ButtonBase>
  );
};

export default memo(Logo);
