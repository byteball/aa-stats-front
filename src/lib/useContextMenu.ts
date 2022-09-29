import { MouseEvent, useCallback, useState } from 'react';

interface IUseContextMenuOutput {
  mouseX: number | null;
  mouseY: number | null;
  // eslint-disable-next-line no-unused-vars
  handleOpenContextMenu: (e: MouseEvent) => void;
  handleCloseContextMenu: () => void;
}

export const useContextMenu = (): IUseContextMenuOutput => {
  const [mouseX, setMouseX] = useState<number | null>(null);
  const [mouseY, setMouseY] = useState<number | null>(null);

  const handleOpenContextMenu = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      setMouseX(mouseX === null ? e.clientX : null);
      setMouseY(mouseY === null ? e.clientY : null);
    },
    [mouseX, mouseY]
  );

  const handleCloseContextMenu = useCallback(() => {
    setMouseX(null);
    setMouseY(null);
  }, []);
  return { mouseX, mouseY, handleOpenContextMenu, handleCloseContextMenu };
};
