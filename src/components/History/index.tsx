import HistoryItem from './HistoryItem';
import { Container } from './styles';
import { HistoryItemsProps } from './types';

const HistoryContainer: React.FC<HistoryItemsProps> = ({ items }) => {
  return (
    <Container>
      {items.map((item, index) => (
        <HistoryItem key={index} item={item} />
      ))}
    </Container>
  );
};

export default HistoryContainer;
