import { memo } from 'react';

import { Dialog } from '@mui/material';
import { v4 } from 'uuid';

import { useAppDispatch, useAppSelector } from '../../../store';
import {
  closeModalAction,
  modalStackSelector,
} from '../../../store/ModalStack';

const ModalStack: React.FC = () => {
  const modalStack = useAppSelector(modalStackSelector);
  const dispatch = useAppDispatch();
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {modalStack.map((modal) => (
        <Dialog
          key={v4()}
          PaperProps={{ sx: { bgcolor: 'transparent', boxShadow: 5 } }}
          open={modal.open}
          onClose={() => dispatch(closeModalAction())}
        >
          {modal.window}
        </Dialog>
      ))}
    </>
  );
};

export default memo(ModalStack);
