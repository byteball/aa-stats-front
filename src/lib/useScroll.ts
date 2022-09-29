import { useCallback, useEffect, useState } from 'react';

export const useScroll = (): boolean => {
  const [isScrollTop, setIsScrollTop] = useState(true);

  const updateScrollPosition = useCallback(
    (scroll: number) => {
      if (isScrollTop && scroll > 0) {
        setIsScrollTop(false);
      } else if (!isScrollTop && scroll === 0) {
        setIsScrollTop(true);
      }
    },
    [isScrollTop]
  );

  useEffect(() => {
    window.addEventListener('scroll', () =>
      updateScrollPosition(window.scrollY)
    );
  }, [updateScrollPosition]);

  return isScrollTop;
};
