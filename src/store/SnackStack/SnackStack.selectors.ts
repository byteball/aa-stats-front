import { createSelector } from '@reduxjs/toolkit';

import { TRootState } from 'store';

const snackStackSelector = (
  state: TRootState
): { snackBarsStack: IStackedSnackBar[] } => state.snackStack;

export const snackBarsStackSelector = createSelector(
  snackStackSelector,
  (snackStack) => snackStack.snackBarsStack
);
