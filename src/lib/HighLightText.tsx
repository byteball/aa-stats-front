import { FC, memo } from 'react';

import { Box, SxProps } from '@mui/material';

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
        {parts.map((part, i) => (
          <Box
            // eslint-disable-next-line react/no-array-index-key
            key={i}
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
