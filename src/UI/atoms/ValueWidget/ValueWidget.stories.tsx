import { ComponentStory, ComponentMeta } from '@storybook/react';

import NeuBox from 'UI/templates/NeuBox/NeuBox';

import ValueWidget from './ValueWidget';

export default {
  title: 'atoms/ValueWidget',
  component: ValueWidget,
} as ComponentMeta<typeof ValueWidget>;

const Template: ComponentStory<typeof ValueWidget> = (args) => (
  <div style={{ width: '400px', height: '175px' }}>
    <NeuBox>
      <ValueWidget {...args} />
    </NeuBox>
  </div>
);

export const Currency = Template.bind({});
Currency.args = {
  title: 'Obyte',
  value: 123213.43,
  unit: '$',
};

export const Common = Template.bind({});
Common.args = {
  title: 'Obyte',
  value: 123213.43,
  unit: '%',
};
