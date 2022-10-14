import { FC, memo } from 'react';

import { Box, ButtonBase, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { useStateUrlParams } from 'lib/useStateUrlParams';
import { useAppSelector } from 'store';
import { initialHomeSearchParamsSelector } from 'store/UI';

import { styles } from './styles';

const Logo: FC<ILogoProps> = ({ title, subtitle }) => {
  const nav = useNavigate();
  const params = useAppSelector(initialHomeSearchParamsSelector);
  const { getParamsString } = useStateUrlParams();

  return (
    <ButtonBase
      sx={styles.root}
      onClick={() => nav(`/?${getParamsString(params)}`)}
    >
      <Box sx={styles.logo} />
      {title && (
        <Box sx={styles.credits}>
          <Typography component='h1' sx={styles.title}>
            {title}
          </Typography>
          {subtitle && (
            <Typography component='h2' sx={styles.subtitle}>
              {subtitle}
            </Typography>
          )}
        </Box>
      )}
    </ButtonBase>
  );
};

export default memo(Logo);
