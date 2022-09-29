/* eslint-disable no-unused-vars */
interface IActionButtonsProps {
  config: IUiControls[];
  handler: (value: number) => () => void;
  isSelected: (value: number) => boolean;
  color?:
    | 'inherit'
    | 'secondary'
    | 'primary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning';
}
