interface IShareMenuProps {
  onClose: () => void;
  mouseX: number | null;
  mouseY: number | null;
  title: string;
  refEl: React.MutableRefObject<HTMLElement | null>;
}
