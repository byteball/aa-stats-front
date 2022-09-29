import { ComponentStory, ComponentMeta } from '@storybook/react';

import NeuBox from './NeuBox';

export default {
  title: 'templates/NeuBox',
  component: NeuBox,
} as ComponentMeta<typeof NeuBox>;

const Template: ComponentStory<typeof NeuBox> = (args) => (
  <div style={{ width: '400px', height: '175px' }}>
    <NeuBox {...args} />
  </div>
);

export const Primary = Template.bind({});
Primary.args = {
  children: 'content',
};
