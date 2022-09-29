import { FC, memo } from 'react';

import { useMedia } from 'lib/useMedia';
import MostActiveAgentsWidget from 'UI/atoms/MostActiveAgentsWidget/MostActiveAgentsWidget';
import TurnoverValueWidget from 'UI/atoms/TurnoverValueWidget/TurnoverValueWidget';
import TvlValueWidget from 'UI/atoms/TvlValueWidget/TvlValueWidget';
import AgentsTableConnected from 'UI/molecules/AgentsTable/AgentsTableConnected';
import TotalGraphConnected from 'UI/molecules/TotalGraph/TotalGraphConnected';
import DragBox from 'UI/templates/DragBox/DragBox';
import DragLayout from 'UI/templates/DragLayout/DragLayout';

const HomeDashboardLayout: FC<IHomeDashboardLayoutProps> = ({
  layouts,
  handleLayouts,
}) => {
  const { isPortable } = useMedia();
  return (
    <>
      <DragLayout
        cols={{ xxs: 1, xs: 2, sm: 3, md: 3, lg: 4 }}
        compactType='vertical'
        layouts={layouts}
        margin={isPortable ? [10, 10] : [25, 25]}
        rowHeight={145}
        isBounded
        measureBeforeMount
        onLayoutChange={handleLayouts}
      >
        <DragBox key='widget-1'>
          <TvlValueWidget />
        </DragBox>
        <DragBox key='widget-2'>
          <TurnoverValueWidget />
        </DragBox>
        <DragBox key='widget-3'>
          <MostActiveAgentsWidget />
        </DragBox>
        <DragBox key='widget-chart'>
          <TotalGraphConnected />
        </DragBox>
      </DragLayout>

      <AgentsTableConnected />
    </>
  );
};

export default memo(HomeDashboardLayout);
