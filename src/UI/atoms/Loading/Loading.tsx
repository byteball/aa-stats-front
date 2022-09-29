import { FC, memo } from 'react';

import { Backdrop, Box, CircularProgress, Typography } from '@mui/material';

const Loading: FC<ILoadingProps> = ({ fullscreen }) => {
  if (fullscreen) {
    return (
      <Backdrop
        sx={{
          zIndex: 'modal',
          bgcolor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
        }}
        open
      >
        <CircularProgress color='primary' />
        <Typography
          sx={{
            fontWeight: 700,
            opacity: '0.18',
            userSelect: 'none',
          }}
        >
          Obyte
        </Typography>
      </Backdrop>
    );
  }
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CircularProgress />
      <Typography
        sx={{
          fontWeight: 700,
          opacity: '0.18',
          userSelect: 'none',
        }}
      >
        Obyte
      </Typography>
    </Box>
  );
};

export default memo(Loading);
