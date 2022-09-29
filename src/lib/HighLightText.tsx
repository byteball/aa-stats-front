import { FC, memo } from 'react';

import { Box, SxProps } from '@mui/material';
import { v4 } from 'uuid';

interface IHighlightTextProps {
  text: string;
  highlight: string;
}

const styles: Record<string, SxProps> = {
  highlight: {
    bgcolor: 'secondary.main',
    color: 'white',
  },
};

export const HighlightText: FC<IHighlightTextProps> = memo(
  ({ text, highlight }) => {
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <span>
        {parts.map((part) => (
          <Box
            key={v4()}
            component='span'
            sx={
              part.toLowerCase() === highlight.toLowerCase()
                ? styles.highlight
                : undefined
            }
          >
            {part}
          </Box>
        ))}
      </span>
    );
  }
);
