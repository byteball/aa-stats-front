import { TAppDispatch } from 'store';

import { closeModal, removeModal } from '.';

export const closeModalAction =
  () =>
  (dispatch: TAppDispatch): void => {
    dispatch(closeModal());
    setTimeout(() => dispatch(removeModal()), 100);
  };
