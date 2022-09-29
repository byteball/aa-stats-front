import { createSelector } from '@reduxjs/toolkit';

import { TRootState } from 'store';

const stateSelector = (state: TRootState): TRootState => state;

export const modalStackSelector = createSelector(
  stateSelector,
  (st) => st.modalStack
);
