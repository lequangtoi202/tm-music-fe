import { useContext, useEffect, useState } from 'react';
import HistoryItem from './HistoryItem';
import { Container } from './styles';
import { HistoryItemsProps } from './types';
import { MoreAction } from '../MoreAction';
import { KContext } from '../../context';

const HistoryContainer: React.FC<HistoryItemsProps> = ({ items }) => {
  const [loading, setLoading] = useState(true);
  const { tempSongOrAlbum } = useContext(KContext);
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
        <HistoryItem key={index} item={item} loading={loading} />
      ))}
      <MoreAction song={tempSongOrAlbum} />
    </Container>
  );
};

export default HistoryContainer;
