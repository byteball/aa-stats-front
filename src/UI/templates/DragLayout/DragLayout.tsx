import { FC, memo } from 'react';

import { Box } from '@mui/material';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const DragLayout: FC<IDragLayoutTypes> = ({ children, ...props }) => {
  const ResponsiveLayout = WidthProvider(Responsive);
  return (
    <Box
      sx={{
        '& .react-grid-item.react-grid-placeholder': {
          backgroundColor: 'transparent',
          borderWidth: '2px',
          borderStyle: 'dashed',
          borderColor: 'primary.main',
          borderRadius: '10px',
        },
      }}
    >
      <ResponsiveLayout
        breakpoints={{ xxs: 0, xs: 600, sm: 960, md: 1366, lg: 1920 }}
        {...props}
      >
        {children}
      </ResponsiveLayout>
    </Box>
  );
};

export default memo(DragLayout);
