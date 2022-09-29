import { FC, memo } from 'react';

import HomeDashboard from 'UI/organisms/HomeDashboard/HomeDashboard';

import HelmetTitle from '../../UI/atoms/Meta/Meta';

const Home: FC = () => (
  <>
    <HelmetTitle
      description='Autonomous Agents Statistics'
      ogDescription='Autonomous Agents Statistics'
      ogTitle='Autonomous Agents Statistics'
      title='Obyte | Autonomous Agents Statistics'
    />
    <HomeDashboard />
  </>
);
export default memo(Home);
