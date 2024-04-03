import { ISong } from '../../types/Song';

interface HistoryItemProps {
  item: ISong;
  loading: boolean;
}

interface HistoryItemsProps {
  items: ISong[];
}

export type { HistoryItemProps, HistoryItemsProps };
