import { useCallback, useEffect, useState } from 'react';

import { useLocation, useNavigationType, useNavigate } from 'react-router-dom';

interface IBeBackStack {
  pathname: string;
  key: string;
}

export const useBeBack = (): void => {
  const [stack, setStack] = useState<IBeBackStack[]>([]);
  const [forward, setForward] = useState<IBeBackStack | undefined>(undefined);
  const action = useNavigationType();
  const nav = useNavigate();
  const { pathname, key } = useLocation();

  const getUniqStackArray = useCallback(
    (arr: IBeBackStack[]) => {
      if (arr.at(0)?.pathname !== pathname) return [{ pathname, key }, ...arr];
      if (arr.at(0)?.pathname === pathname && arr.at(0)?.key !== key)
        return arr.map((s, i) => (i === 0 ? { ...s, key } : s));
      return arr;
    },
    [key, pathname]
  );

  useEffect(() => {
    if (action === 'PUSH') setStack(getUniqStackArray);
    if (action === 'POP') {
      const firstStackedValue = stack.at(0);
      const secondStackedValue = stack.at(1);
      if (firstStackedValue && key === firstStackedValue.key && forward) {
        nav(forward);
      } else if (stack.length > 1 && secondStackedValue) {
        nav(secondStackedValue.pathname);
        setForward(stack.shift());
      }
    }
  }, [action, getUniqStackArray, pathname, key, stack, nav, forward]);
};
