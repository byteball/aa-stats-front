interface IDragLayoutProps {
  children: React.ReactNode[] | React.ReactNode;
}

type IDragLayoutTypes = Omit<
  ReactGridLayout.ResponsiveProps & ReactGridLayout.WidthProviderProps,
  'breakpoints'
> &
  IDragLayoutProps;
