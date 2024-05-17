import { IGenre } from '../../types/Genre';

interface GenreItemsProps {
  genres: IGenre[];
  loading?: boolean;
}

interface GenreItemProps {
  genre: IGenre;
}

export type { GenreItemProps, GenreItemsProps };
