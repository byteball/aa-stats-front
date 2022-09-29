import { FC, memo } from 'react';

import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { IconButton } from '@mui/material';

const DarkModeSwitcherLayout: FC<IDarkModeSwitcherLayoutProps> = ({
  darkMode,
  switchMode,
}) => (
  <IconButton onClick={switchMode}>
    {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
  </IconButton>
);

export default memo(DarkModeSwitcherLayout);
