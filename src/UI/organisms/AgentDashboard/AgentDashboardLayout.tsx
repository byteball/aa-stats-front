import { FC, memo } from 'react';

import { useMedia } from 'lib/useMedia';
import AgentInfoWidget from 'UI/atoms/AgentInfoWidget/AgentInfoWidget';
import AgentTurnoverValueWidget from 'UI/atoms/AgentTurnoverValueWidget/AgentTurnoverValueWidget';
import AgentTvlValueWidget from 'UI/atoms/AgentTvlValueWidget/AgentTvlValueWidget';
import AgentGraphConnected from 'UI/molecules/AgentGraph/AgentGraphConnected';
import AgentsTableConnected from 'UI/molecules/AgentsTable/AgentsTableConnected';
import DragBox from 'UI/templates/DragBox/DragBox';
import DragLayout from 'UI/templates/DragLayout/DragLayout';

const AgentDashboardLayout: FC<IAgentDashboardLayoutProps> = ({
  layouts,
  handleLayouts,
}) => {
  const { isPortable } = useMedia();
  return (
    <>
      <AgentInfoWidget />
      <DragLayout
        cols={{ xxs: 1, xs: 2, sm: 3, md: 3, lg: 4 }}
        layouts={layouts}
        margin={isPortable ? [10, 10] : [25, 25]}
        rowHeight={165}
        isBounded
        measureBeforeMount
        onLayoutChange={handleLayouts}
      >
        <DragBox key='widget-1'>
          <AgentTvlValueWidget />
        </DragBox>
        <DragBox key='widget-2'>
          <AgentTurnoverValueWidget />
        </DragBox>
        <DragBox key='widget-chart'>
          <AgentGraphConnected />
        </DragBox>
      </DragLayout>
      <AgentsTableConnected />
    </>
  );
};

export default memo(AgentDashboardLayout);
