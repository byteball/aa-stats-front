import { SxProps } from '@mui/material';

export const styles: Record<string, SxProps> = {
  root: {
    height: '22px',
    display: 'flex',
    alignItems: 'center',
    '&>*:not(:last-child)': {
      mr: '10px',
    },
  },
  group: {
    height: '100%',
  },
  gbutton: { boxShadow: 'none', px: '5px', py: '2px', height: '100%' },
  button: { boxShadow: 'none', height: '100%' },
};
