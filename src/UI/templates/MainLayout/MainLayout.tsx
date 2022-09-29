import { FC, memo, Suspense } from 'react';

import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';

import Loading from 'UI/atoms/Loading/Loading';
import Header from 'UI/templates/Header/Header';

import Footer from '../Footer/Footer';
import { styles } from './styles';

const MainLayout: FC = () => (
  <Container maxWidth={false} sx={styles.root} disableGutters>
    <Header />
    <Container component='main' maxWidth='lg' sx={styles.main} disableGutters>
      <Suspense fallback={<Loading fullscreen />}>
        <Outlet />
      </Suspense>
    </Container>
    <Footer />
  </Container>
);

export default memo(MainLayout);
