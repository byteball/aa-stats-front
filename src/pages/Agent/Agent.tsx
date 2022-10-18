import { FC, memo, useMemo } from 'react';

import { useParams } from 'react-router-dom';

import { useAppSelector } from 'store';
import { descriptionByAddressSelector } from 'store/Obyte';
import AgentDashboard from 'UI/organisms/AgentDashboard/AgentDashboard';

import HelmetTitle from '../../UI/atoms/Meta/Meta';

const Agent: FC = () => {
  const { address = '' } = useParams<{ address: string }>();
  const getDescription = useAppSelector(descriptionByAddressSelector);
  const description = useMemo(
    () => getDescription(address) || address,
    [address, getDescription]
  );

  return (
    <>
      <HelmetTitle
        description='Agent Statistics'
        ogDescription='Agent Statistics'
        ogTitle={description}
        title={`Obyte | ${description}`}
      />
      <AgentDashboard />
    </>
  );
};

export default memo(Agent);
