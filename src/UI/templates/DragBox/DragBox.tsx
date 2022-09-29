import { FC, forwardRef, memo } from 'react';

import { Box } from '@mui/material';

import { useAppSelector } from 'store';
import { darkModeSelector } from 'store/UI';

const DragBox: FC<IDragBoxProps> = forwardRef(
  ({ children, style, className, ...props }, ref) => {
    const darkMode = useAppSelector(darkModeSelector);
    return (
      <Box
        ref={ref}
        className={className}
        component='div'
        style={style}
        sx={{
          width: '100%',
          height: '100%',
          transition: 'all 250ms',
          '&.react-grid-item > .react-resizable-handle': {
            bottom: '4px!important',
            right: '4px!important',
            '&::after': {
              borderRight: darkMode
                ? '2px solid #fff'
                : '2px solid rgba(0,0,0,.6)',
              borderBottom: darkMode
                ? '2px solid #fff'
                : '2px solid rgba(0,0,0,.6)',
            },
          },
        }}
        {...props}
      >
        {children}
      </Box>
    );
  }
);

export default memo(DragBox);
