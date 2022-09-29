import { FC, memo } from 'react';

import { Box, Typography } from '@mui/material';

import { styles } from './styles';

const AgentDescription: FC = () => (
  <Box sx={styles.root}>
    <Box sx={styles.wrapper}>
      <Typography variant='h5'>Title</Typography>
      <Typography align='justify'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </Typography>
    </Box>
  </Box>
);
export default memo(AgentDescription);
