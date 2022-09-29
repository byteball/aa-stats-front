import { FC, memo, useCallback, useMemo } from 'react';

import LinkIcon from '@mui/icons-material/Link';
import {
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import { toPng } from 'html-to-image';

import { useAppDispatch } from 'store';
import { showSnackBar } from 'store/SnackStack';
import PngIcon from 'UI/icons/PngIcon';

import { styles } from './styles';

const ShareMenu: FC<IShareMenuProps> = ({
  onClose,
  mouseX,
  mouseY,
  title,
  refEl,
}) => {
  const dispatch = useAppDispatch();

  const open = useMemo(
    () => mouseX !== null && mouseY !== null,
    [mouseX, mouseY]
  );

  const getFileName = useCallback(
    (fileType: 'png' | 'jpg') =>
      `${title.replaceAll(' ', '_')}_${Date.now()}.${fileType}`,
    [title]
  );

  const handleSaveAsPng = useCallback(async () => {
    try {
      if (!refEl.current) throw new Error();
      const dataUrl = await toPng(refEl.current, { cacheBust: true });
      const link = document.createElement('a');
      link.download = `${getFileName('png')}`;
      link.href = dataUrl;
      link.click();
    } catch (e) {
      dispatch(
        showSnackBar({
          title: 'Ooops',
          message: 'Png saving error, try again',
          severity: 'error',
        })
      );
    } finally {
      onClose();
    }
  }, [dispatch, getFileName, onClose, refEl]);

  const handleCopyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);

      dispatch(
        showSnackBar({
          message: 'Link successfully copied to clipboard',
          severity: 'success',
        })
      );
    } catch (e) {
      dispatch(
        showSnackBar({
          title: 'Ooops',
          message: `Clipboard error, try again ${
            e instanceof Error ? e.message : JSON.stringify(e)
          }`,
          severity: 'error',
        })
      );
    } finally {
      onClose();
    }
  }, [dispatch, onClose]);

  return (
    <Menu
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      anchorPosition={open ? { top: mouseY!, left: mouseX! } : undefined}
      anchorReference='anchorPosition'
      open={open}
      sx={{ maxWidth: '185px' }}
      disableRestoreFocus
      onClose={onClose}
    >
      <Typography sx={styles.title}>{title}</Typography>
      <MenuItem onClick={handleSaveAsPng}>
        <ListItemIcon>
          <PngIcon />
        </ListItemIcon>
        <ListItemText>Save as PNG</ListItemText>
      </MenuItem>
      <MenuItem onClick={handleCopyToClipboard}>
        <ListItemIcon>
          <LinkIcon />
        </ListItemIcon>
        <ListItemText>Copy link</ListItemText>
      </MenuItem>
    </Menu>
  );
};

export default memo(ShareMenu);
