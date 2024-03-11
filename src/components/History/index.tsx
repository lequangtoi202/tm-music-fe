import { useEffect, useState } from 'react';
import HistoryItem from './HistoryItem';
import { Container } from './styles';
import { HistoryItemsProps } from './types';

const HistoryContainer: React.FC<HistoryItemsProps> = ({ items }) => {
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
        <HistoryItem key={index} item={item} loading={loading} />
      ))}
    </Container>
  );
};

export default HistoryContainer;
