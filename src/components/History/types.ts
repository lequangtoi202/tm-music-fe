import { IHistory } from '../../types/History';

interface HistoryItemProps {
  item: IHistory;
  loading: boolean;
}

interface HistoryItemsProps {
  items: IHistory[];
}

export type { HistoryItemProps, HistoryItemsProps };
