import { ISinger } from '../../types/Singer';


type ReCallApiFunction = () => void;

interface ArtistInfoProps {
  item: any;
  loading?: boolean;
  reCallApi?: ReCallApiFunction;
}

export type { ArtistInfoProps };
