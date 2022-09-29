import { FC, memo, useCallback, useMemo } from 'react';

import { SnackbarCloseReason } from '@mui/material';

import { useAppDispatch, useAppSelector } from 'store';
import { closeSnackAction, snackBarsStackSelector } from 'store/SnackStack';

import SnackStackLayout from './SnackStackLayout';
import { ISnackStackProps } from './types';

const SnackStack: FC<ISnackStackProps> = ({
  anchorOrigin = undefined,
  spacing = 1,
  maxSnack = 5,
}) => {
  const snackBarsStack = useAppSelector(snackBarsStackSelector);
  const dispatch = useAppDispatch();

  const handleClose = useCallback(
    (id: string) => dispatch(closeSnackAction(id)),
    [dispatch]
  );

  const handleCloseByTimeout = useCallback(
    (
      event: Event | React.SyntheticEvent<unknown, Event>,
      reason: SnackbarCloseReason,
      id: string
    ) => {
      if (reason === 'timeout') {
        handleClose(id);
      }
    },
    [handleClose]
  );

  const top = useMemo(() => {
    switch (anchorOrigin?.vertical) {
      case 'top':
        return 0;
      default:
        return 'auto';
    }
  }, [anchorOrigin?.vertical]);

  const bottom = useMemo(() => {
    switch (anchorOrigin?.vertical) {
      case 'top':
        return 'auto';
      default:
        return 0;
    }
  }, [anchorOrigin?.vertical]);

  const left = useMemo(() => {
    switch (anchorOrigin?.horizontal) {
      case 'right':
        return 'auto';
      case 'center':
        return '50%';
      default:
        return 0;
    }
  }, [anchorOrigin?.horizontal]);

  const right = useMemo(() => {
    switch (anchorOrigin?.horizontal) {
      case 'left':
        return 'auto';
      case 'center':
        return '50%';
      default:
        return 0;
    }
  }, [anchorOrigin?.horizontal]);

  const transform = useMemo(() => {
    switch (anchorOrigin?.horizontal) {
      case 'center':
        return 'translateX(-50%)';
      default:
        return 'none';
    }
  }, [anchorOrigin?.horizontal]);

  const cuttedSnackStack = useMemo(
    () => snackBarsStack.slice(-maxSnack),
    [maxSnack, snackBarsStack]
  );

  return (
    <SnackStackLayout
      anchorOrigin={anchorOrigin}
      bottom={bottom}
      cuttedSnackStack={cuttedSnackStack}
      handleClose={handleClose}
      handleCloseByTimeout={handleCloseByTimeout}
      left={left}
      right={right}
      spacing={spacing}
      top={top}
      transform={transform}
    />
  );
};

export default memo(SnackStack);
