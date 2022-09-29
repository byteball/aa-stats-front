import { memo, lazy, FC, useEffect, useMemo } from 'react';

import { Route, Routes, useLocation } from 'react-router-dom';

import { fireNavigationAnalyticsEvent } from 'lib/analytics';
import { useBeBack } from 'lib/useBeBack';

import NotFound from './pages/NotFound/NotFound';
import MainLayout from './UI/templates/MainLayout/MainLayout';

const Home = lazy(() => import('pages/Home/Home'));
const Agent = lazy(() => import('pages/Agent/Agent'));

const Router: FC = () => {
  const loc = useLocation();

  const fullUrl = useMemo(
    () =>
      `${window.location.protocol}//${window.location.host}${loc.pathname}${loc.search}`,
    [loc.pathname, loc.search]
  );

  useEffect(() => {
    if (!loc.search) return;
    fireNavigationAnalyticsEvent(fullUrl);
  }, [fullUrl, loc.search]);

  useBeBack();

  return (
    <Routes>
      <Route element={<MainLayout />} path='*'>
        <Route element={<Home />} path='' />
        <Route element={<Agent />} path='aa/:address' />
        <Route element={<NotFound />} path='*' />
      </Route>
      <Route element={<NotFound />} path='*' />
    </Routes>
  );
};

export default memo(Router);
