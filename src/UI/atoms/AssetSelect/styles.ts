import { SxProps } from '@mui/material';

export const styles: Record<string, SxProps> = {
  root: {
    width: 'auto',
    maxWidth: '220px',
    minWidth: '120px',
    border: 'none',
    '& .MuiInput-root:before, .MuiInput-root:after, .MuiInput-underline:hover:not(.Mui-disabled):before':
      {
        border: 'none',
      },
  },
  item: {
    display: 'flex',
  },
  icon: {
    width: '20px',
    minWidth: '20px',
    height: '20px',
    mr: '10px',
    '& svg': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
  },
  label: {
    fontSize: '14px',
    fontWeight: 300,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  menu: {
    maxHeight: '350px',
    maxWidth: '370px',
  },
};
