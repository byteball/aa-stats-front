import { TAppDispatch } from 'store';

import { closeSnackBar, removeSnackBar } from '.';

export const closeSnackAction =
  (id: string) =>
  (dispatch: TAppDispatch): void => {
    dispatch(closeSnackBar(id));
    setTimeout(() => dispatch(removeSnackBar(id)), 100);
  };
