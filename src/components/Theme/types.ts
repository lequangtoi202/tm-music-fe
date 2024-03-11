import { ITheme } from '../../types/Theme';

interface ThemeItemProps {
  item: ITheme;
  loading: boolean;
}

interface ThemeItemsProps {
  items: ITheme[];
  loading: boolean;
}

export type { ThemeItemProps, ThemeItemsProps };
