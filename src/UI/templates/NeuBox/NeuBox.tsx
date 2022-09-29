import { FC, forwardRef, memo } from 'react';

import { Box } from '@mui/material';

import { useNeuBoxShadow } from 'lib/useNeuBoxShadow';

const NeuBox: FC<INeuBoxProps> = forwardRef(({ children, ...props }, ref) => {
  const { boxShadow } = useNeuBoxShadow();
  return (
    <Box
      ref={ref}
      sx={{
        width: '100%',
        height: '100%',
        p: '10px',
        transition: 'all 250ms',
        boxShadow,
        borderRadius: 2,
        backgroundColor: 'background.default',
      }}
      {...props}
    >
      {children}
    </Box>
  );
});

export default memo(NeuBox) as typeof Box;
