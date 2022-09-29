/* eslint-disable no-unused-vars */
import { SnackbarCloseReason, SnackbarOrigin } from '@mui/material';

export interface ISnackStackProps {
  anchorOrigin?: SnackbarOrigin;
  spacing?: number;
  maxSnack?: number;
}

export interface ISnackStackLayoutProps {
  cuttedSnackStack: IStackedSnackBar[];
  spacing: number;
  top: 0 | 'auto';
  right: 'auto' | 0 | '50%';
  bottom: 0 | 'auto';
  left: 0 | 'auto' | '50%';
  transform: string;
  anchorOrigin: SnackbarOrigin | undefined;
  handleClose: (id: string) => void;
  handleCloseByTimeout: (
    event: Event | React.SyntheticEvent<unknown, Event>,
    reason: SnackbarCloseReason,
    id: string
  ) => void;
}
