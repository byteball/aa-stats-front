interface ISnackBar {
  autoHideDuration?: number;
  severity?: snackSeverityTypes;
  title?: string;
  message: string;
  variant?: snackVariantsTypes;
  closable?: boolean;
}

interface IStackedSnackBar extends ISnackBar {
  id: string;
  open: boolean;
}

type snackSeverityTypes = 'error' | 'warning' | 'info' | 'success';
type snackVariantsTypes = 'filled' | 'outlined' | 'standard';
