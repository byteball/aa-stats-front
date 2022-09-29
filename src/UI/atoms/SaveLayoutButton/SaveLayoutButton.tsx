import { FC, memo, useCallback, useMemo } from 'react';

import { useAppDispatch, useAppSelector } from 'store';
import {
  agentLayoutsCacheSelector,
  homeLayoutsCacheSelector,
  saveAgentLayout,
  saveHomeLayout,
} from 'store/UI';

import SaveLayoutButtonLayout from './SaveLayoutButton.layout';

const SaveLayoutButton: FC = () => {
  const homeLayoutsCache = useAppSelector(homeLayoutsCacheSelector);
  const agentLayoutsCache = useAppSelector(agentLayoutsCacheSelector);

  const isHomeCache = useMemo(
    () => 'sm' in homeLayoutsCache,
    [homeLayoutsCache]
  );

  const isAgentCache = useMemo(
    () => 'sm' in agentLayoutsCache,
    [agentLayoutsCache]
  );

  const isCache = useMemo(
    () => isHomeCache || isAgentCache,
    [isHomeCache, isAgentCache]
  );

  const dispatch = useAppDispatch();
  const save = useCallback(() => {
    if (isHomeCache) {
      dispatch(saveHomeLayout());
    }
    if (isAgentCache) {
      dispatch(saveAgentLayout());
    }
  }, [dispatch, isAgentCache, isHomeCache]);
  if (!isCache) return null;
  return <SaveLayoutButtonLayout save={save} />;
};

export default memo(SaveLayoutButton);
