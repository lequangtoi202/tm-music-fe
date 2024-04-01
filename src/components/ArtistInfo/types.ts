interface ArtistInfoProps {
  item: Artist;
  loading?: boolean;
}

interface Artist {
  src: string;
  id: string;
  name: string;
}

export type { ArtistInfoProps };
