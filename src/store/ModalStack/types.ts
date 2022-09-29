import { ReactElement } from 'react';

export interface IModalStack {
  open: boolean;
  window: ModalStackTypes;
}

export type ModalStackTypes = ReactElement | JSX.Element;
