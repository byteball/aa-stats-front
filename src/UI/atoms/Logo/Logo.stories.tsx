import { ComponentStory, ComponentMeta } from '@storybook/react';

import Logo from './Logo';

export default {
  title: 'atoms/Logo',
  component: Logo,
} as ComponentMeta<typeof Logo>;

const Template: ComponentStory<typeof Logo> = (args) => <Logo {...args} />;

export const Titled = Template.bind({});
Titled.args = {
  title: 'Obyte',
  subtitle: 'Autonomous Agents Statistics',
};

export const WithoutTitle = Template.bind({});
WithoutTitle.args = {};
