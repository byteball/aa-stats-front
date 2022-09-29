import { useMemo } from 'react';

import { useLocation } from 'react-router-dom';

interface IUsePageOutput {
  isHomePage: boolean;
  isAgentPage: boolean;
}

export const usePage = (): IUsePageOutput => {
  const loc = useLocation();
  const isHomePage = useMemo(() => loc.pathname === '/', [loc.pathname]);
  const isAgentPage = useMemo(
    () => loc.pathname.indexOf('/aa/') !== -1,
    [loc.pathname]
  );

  return { isHomePage, isAgentPage };
};
