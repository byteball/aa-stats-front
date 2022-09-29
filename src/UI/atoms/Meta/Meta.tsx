import { memo } from 'react';

import { Helmet } from 'react-helmet-async';

import { useAppSelector } from 'store';
import { darkModeSelector } from 'store/UI';

interface IHelmetProps {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
}

const Meta = ({
  title,
  description,
  ogTitle,
  ogDescription,
}: IHelmetProps): JSX.Element => {
  const darkMode = useAppSelector(darkModeSelector);
  return (
    <Helmet>
      <title>{title}</title>
      <meta content={title} name='title' />
      <meta content={description} name='description' />
      <meta content={ogTitle} name='og:title' />
      <meta content={ogDescription} name='og:description' />
      <meta content={darkMode ? '#252850' : '#f0f4f9'} name='theme-color' />
    </Helmet>
  );
};

export default memo(Meta);
