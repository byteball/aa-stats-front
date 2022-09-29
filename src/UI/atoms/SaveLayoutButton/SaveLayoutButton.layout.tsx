import { FC, memo } from 'react';

import SaveIcon from '@mui/icons-material/Save';
import { IconButton, Tooltip } from '@mui/material';

const SaveLayoutButtonLayout: FC<ISaveLayoutButtonLayoutProps> = ({ save }) => (
  <Tooltip
    title='Save your settings so that you can have a better experience on your next visit'
    arrow
  >
    <IconButton color='secondary' onClick={save}>
      <SaveIcon />
    </IconButton>
  </Tooltip>
);

export default memo(SaveLayoutButtonLayout);
