import { Container } from '@mui/material';
import CardItem from '../Card';
import { CardItemsProps } from '../Card/types';

const HistoryContainer: React.FC<CardItemsProps> = ({ items }) => {
  return (
    <Container style={{ height: '124px', display: 'flex', gap: '38px', marginTop: '16px' }}>
      {items.map((item, index) => (
        <CardItem key={index} item={item} />
      ))}
    </Container>
  );
};

export default HistoryContainer;
