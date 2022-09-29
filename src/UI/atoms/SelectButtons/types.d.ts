/* eslint-disable no-unused-vars */
interface ISelectButtonsProps<V> {
  config: IUiSelects<V>[];
  handler: (value: keyof V) => () => void;
  isSelected: (value: keyof V) => boolean;
}
