import { useEffect, useState } from 'react';
import AlbumItem from './AlbumItem';
import { Container } from './styles';
import { AlbumItemsProps } from './types';

const AlbumContainer: React.FC<AlbumItemsProps> = ({ items }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
    };

    fetchData();
  }, []);
  return (
    <Container>
      {items.map((item, index) => (
        <AlbumItem key={index} item={item} loading={loading}></AlbumItem>
      ))}
    </Container>
  );
};

export default AlbumContainer;
