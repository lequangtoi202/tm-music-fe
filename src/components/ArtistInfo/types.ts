import { ISinger } from '../../types/Singer';

type ReCallApiFunction = () => void;

interface ArtistInfoProps {
  item: ISinger;
  loading?: boolean;
  reCallApi?: ReCallApiFunction;
}

export type { ArtistInfoProps };
