import { FC, memo, useCallback } from 'react';

import { useAppDispatch, useAppSelector } from 'store';
import { darkModeSelector, toggleDarkMode } from 'store/UI';

import DarkModeSwitcherLayout from './DarkModeSwitcherLayout';

const DarkModeSwitcher: FC = () => {
  const darkMode = useAppSelector(darkModeSelector);
  const dispatch = useAppDispatch();
  const switchMode = useCallback(() => dispatch(toggleDarkMode()), [dispatch]);

  return <DarkModeSwitcherLayout darkMode={darkMode} switchMode={switchMode} />;
};

export default memo(DarkModeSwitcher);
