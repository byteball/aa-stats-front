/* eslint-disable no-console */
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SnackStack from './SnackStackLayout';

export default {
  title: 'atoms/SnackStack',
  component: SnackStack,
} as ComponentMeta<typeof SnackStack>;

const Template: ComponentStory<typeof SnackStack> = (args) => (
  <SnackStack {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  cuttedSnackStack: [
    { id: '1', autoHideDuration: 1000000, open: true, message: 'message' },
    {
      id: '2',
      autoHideDuration: 1000000,
      open: true,
      message: 'message',
      severity: 'info',
    },
    {
      id: '3',
      autoHideDuration: 1000000,
      open: true,
      message: 'message',
      severity: 'warning',
      closable: true,
    },
    {
      id: '4',
      autoHideDuration: 1000000,
      open: true,
      message: 'message',
      severity: 'error',
      title: 'Fatal',
    },
    {
      id: '5',
      autoHideDuration: 1000000,
      open: true,
      message: 'message',
      variant: 'filled',
    },
    {
      id: '6',
      autoHideDuration: 1000000,
      open: true,
      message: 'message',
      variant: 'outlined',
    },
    {
      id: '7',
      autoHideDuration: 1000000,
      open: true,
      message: 'message',
      variant: 'outlined',
      severity: 'error',
      closable: true,
    },
  ],
  anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
  spacing: 1,
  top: 'auto',
  right: 'auto',
  bottom: 0,
  left: 0,
  handleClose: (id) => console.log(id),
  handleCloseByTimeout: (event, reason, id) => {
    console.log(id);
  },
};
