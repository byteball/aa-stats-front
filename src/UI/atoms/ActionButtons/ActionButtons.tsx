import { FC, memo, MouseEvent, useCallback } from 'react';

import { Button, ButtonGroup } from '@mui/material';

import { useMedia } from 'lib/useMedia';

import { styles } from './styles';

const ActionButtons: FC<IActionButtonsProps> = ({
  config,
  isSelected,
  handler,
  color = 'secondary',
}) => {
  const stopPropagate = useCallback((e: MouseEvent) => e.stopPropagation(), []);
  const { isMobile } = useMedia();

  return (
    <ButtonGroup
      color={color}
      size='medium'
      sx={styles.root}
      onMouseDown={stopPropagate}
    >
      {config.map(({ label, labelMobile, value }) => (
        <Button
          key={value}
          sx={styles.button}
          variant={isSelected(value) ? 'contained' : 'text'}
          onClick={handler(value)}
        >
          {isMobile ? labelMobile : label}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default memo(ActionButtons);
