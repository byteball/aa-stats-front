import { FC, memo } from 'react';

import { Box, Link, Typography } from '@mui/material';

import SocialBlock from 'UI/atoms/SocialBlock/SocialBlock';

import { styles } from './styles';

const Footer: FC = () => (
  <Box component='footer' sx={styles.root}>
    <SocialBlock />
    <Box>
      <Typography sx={styles.copyright}>
        © 2024{' '}
        <Link href='https://obyte.org/' sx={styles.link} target='_blank'>
          Obyte.
        </Link>{' '}
        All Rights Reserved
      </Typography>
    </Box>
  </Box>
);
export default memo(Footer);
