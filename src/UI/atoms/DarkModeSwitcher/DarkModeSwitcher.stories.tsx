import { ComponentStory, ComponentMeta } from '@storybook/react';

import DarkModeSwitcher from './DarkModeSwitcherLayout';

export default {
  title: 'atoms/DarkModeSwitcher',
  component: DarkModeSwitcher,
} as ComponentMeta<typeof DarkModeSwitcher>;

const Template: ComponentStory<typeof DarkModeSwitcher> = (args) => (
  <div style={{ display: 'flex' }}>
    <DarkModeSwitcher {...args} />
  </div>
);

export const Primary = Template.bind({});
Primary.args = {
  darkMode: true,
  // eslint-disable-next-line no-console
  switchMode: () => console.log('switch'),
};
