import { SxProps } from '@mui/material';

export const styles: Record<string, SxProps> = {
  wrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    mt: '20px',
  },
  root: {
    width: '100%',
    maxWidth: '900px',
    px: { xs: '16px', sm: '24px' },
  },
  header: {
    width: '100%',
    display: 'flex',
    flexDirection: { xs: 'column', sm: 'row' },
    alignItems: 'center',
    justifyContent: 'space-between',
    mb: '5px',
    px: '10px',
    gap: { xs: '5px', sm: 'unset' },
    '&>div': {
      alignSelf: 'flex-end',
    },
  },
  title: {
    fontSize: '18px',
    fontWeight: 300,
  },
  tableHead: {
    display: 'flex',
    justifyContent: 'space-evenly',
    height: '42px',
  },
  table: {
    '&>div': {
      display: 'flex',
      justifyContent: 'space-between',
      height: '42px',
      px: '10px',
      borderRadius: 2,
      transition: 'background-color 250ms ease-in-out',
      fontSize: { xs: '12px', sm: '14px' },
      fontWeight: 300,
      '&:hover': {
        bgcolor: 'primary.light',
      },
      '&>*': {
        display: 'flex',
        alignItems: 'center',
      },
    },
  },
  loading: {
    my: '10px',
  },
};
