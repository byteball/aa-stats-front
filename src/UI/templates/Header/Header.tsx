import { memo, useMemo } from 'react';

import { AppBar, Box, Toolbar } from '@mui/material';

import { useMedia } from 'lib/useMedia';
import { useScroll } from 'lib/useScroll';
import { useAppSelector } from 'store';
import { darkModeSelector } from 'store/UI';
import DarkModeSwitcher from 'UI/atoms/DarkModeSwitcher/DarkModeSwitcher';
import Logo from 'UI/atoms/Logo/Logo';
import SaveLayoutButton from 'UI/atoms/SaveLayoutButton/SaveLayoutButton';
import Search from 'UI/atoms/Search/Search';

import { stylesByMode } from './styles';

const Header: React.FC = () => {
  const scrollTop = useScroll();
  const darkMode = useAppSelector(darkModeSelector);
  const styles = useMemo(() => stylesByMode(darkMode), [darkMode]);
  const shadow = useMemo(
    () => ({
      ...styles.root,
      ...styles.shadow,
    }),
    [styles.root, styles.shadow]
  );
  const { isPortable } = useMedia();

  return (
    <AppBar color='transparent' sx={scrollTop ? styles.root : shadow}>
      <Toolbar sx={styles.header}>
        <Box sx={styles.headerLine}>
          <Logo subtitle='Autonomous Agents Statistics' title='Obyte' />
          <Box sx={styles.actions}>
            {!isPortable && (
              <Box sx={styles.search}>
                <Search />
              </Box>
            )}
            <SaveLayoutButton />
            <DarkModeSwitcher />
          </Box>
        </Box>
        {isPortable && <Search />}
      </Toolbar>
    </AppBar>
  );
};

export default memo(Header);
