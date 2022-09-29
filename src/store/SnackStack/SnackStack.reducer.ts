import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 } from 'uuid';

const initialState: { snackBarsStack: IStackedSnackBar[] } = {
  snackBarsStack: [],
};

export const SnackStackSlice = createSlice({
  name: 'snackStack',
  initialState,
  reducers: {
    showSnackBar: (state, action: PayloadAction<ISnackBar>) => {
      state.snackBarsStack.push({ ...action.payload, id: v4(), open: true });
    },
    closeSnackBar: (state, action: PayloadAction<string>) => {
      state.snackBarsStack = state.snackBarsStack.map((snack) =>
        snack.id === action.payload ? { ...snack, open: false } : snack
      );
    },
    removeSnackBar: (state, action: PayloadAction<string>) => {
      state.snackBarsStack = state.snackBarsStack.filter(
        (snack) => snack.id !== action.payload
      );
    },
  },
});

export const { showSnackBar, closeSnackBar, removeSnackBar } =
  SnackStackSlice.actions;
export const { reducer: SnackStackReducer } = SnackStackSlice;
