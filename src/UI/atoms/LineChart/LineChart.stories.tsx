import { ComponentStory, ComponentMeta } from '@storybook/react';

import LineChart from './LineChart';

export default {
  title: 'atoms/LineChart',
  component: LineChart,
} as ComponentMeta<typeof LineChart>;

const Template: ComponentStory<typeof LineChart> = (args) => (
  <div style={{ display: 'flex', width: '100%', height: '400px' }}>
    <LineChart {...args} />
  </div>
);

export const Primary = Template.bind({});
Primary.args = {
  data: [],
};
